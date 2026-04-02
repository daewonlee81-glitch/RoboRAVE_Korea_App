"use strict";

(function attachSheetSync(global) {
  const STORAGE_KEY = "robotCompetitionSheetConfig";
  const APPS_SCRIPT_EXEC_PATTERN = /^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec(?:\?.*)?$/i;

  function getStoredConfig() {
    try {
      const raw = global.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return { endpoint: "" };
      }

      const parsed = JSON.parse(raw);
      return {
        endpoint: typeof parsed.endpoint === "string" ? parsed.endpoint : ""
      };
    } catch (error) {
      return { endpoint: "" };
    }
  }

  function saveConfig(config) {
    const nextConfig = {
      endpoint: typeof config?.endpoint === "string" ? config.endpoint.trim() : ""
    };
    global.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextConfig));
    return nextConfig;
  }

  function isAppsScriptExecUrl(endpoint) {
    return APPS_SCRIPT_EXEC_PATTERN.test(String(endpoint || "").trim());
  }

  async function postJsonNoCors(endpoint, payload) {
    const response = await fetch(endpoint, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(payload)
    });

    return {
      ok: true,
      opaque: response.type === "opaque",
      count: Array.isArray(payload?.rows) ? payload.rows.length : 0
    };
  }

  async function postJson(endpoint, payload) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(payload)
      });

      const text = await response.text();
      let data = null;

      try {
        data = text ? JSON.parse(text) : null;
      } catch (error) {
        data = null;
      }

      if (!response.ok) {
        const message = data?.error || `HTTP ${response.status}`;
        throw new Error(message);
      }

      if (data && data.ok === false) {
        throw new Error(data.error || "Google Sheet 저장에 실패했습니다.");
      }

      return data;
    } catch (error) {
      const message = error?.message || String(error);

      if (isAppsScriptExecUrl(endpoint) && /Failed to fetch|NetworkError/i.test(message)) {
        return postJsonNoCors(endpoint, payload);
      }

      throw error;
    }
  }

  function normalizeJudgeNames(value) {
    return String(value || "")
      .split(/\n|,/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  global.sheetSync = {
    getStoredConfig,
    saveConfig,
    isAppsScriptExecUrl,
    postJson,
    normalizeJudgeNames
  };
}(window));
