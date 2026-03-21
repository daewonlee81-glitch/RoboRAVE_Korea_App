let deferredInstallPrompt = null;

function updateActiveNav() {
  const currentPage = document.body?.dataset.appPage;
  if (!currentPage) {
    return;
  }

  document.querySelectorAll("[data-page-link]").forEach((link) => {
    link.classList.toggle("active", link.dataset.pageLink === currentPage);
  });
}

function setupInstallPrompt() {
  const installPanel = document.querySelector("[data-install-panel]");
  const installButton = document.querySelector("[data-install-button]");
  const installStatus = document.querySelector("[data-install-status]");
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;

  if (isStandalone && installPanel) {
    installPanel.classList.remove("is-visible");
    return;
  }

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;

    if (installPanel) {
      installPanel.classList.add("is-visible");
    }
  });

  if (installButton) {
    installButton.addEventListener("click", async () => {
      if (deferredInstallPrompt) {
        deferredInstallPrompt.prompt();
        await deferredInstallPrompt.userChoice;
        deferredInstallPrompt = null;
        if (installPanel) {
          installPanel.classList.remove("is-visible");
        }
        return;
      }

      if (installStatus) {
        installStatus.textContent = "iPhone은 Safari 공유 메뉴의 '홈 화면에 추가', Android는 브라우저 메뉴의 설치 기능을 사용하세요.";
      }

      if (installPanel) {
        installPanel.classList.add("is-visible");
      }
    });
  }

  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    if (installPanel) {
      installPanel.classList.remove("is-visible");
    }
  });
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  const isLocalhost = ["localhost", "127.0.0.1"].includes(window.location.hostname);
  if (window.location.protocol !== "https:" && !isLocalhost) {
    return;
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {
      /* Service worker registration can fail on unsupported previews. */
    });
  });
}

updateActiveNav();
setupInstallPrompt();
registerServiceWorker();
