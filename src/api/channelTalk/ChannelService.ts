class ChannelService {
  loadScript(): void {
    (function () {
      const w = window as any;
      if (w.ChannelIO) {
        return w.console.error('ChannelIO script included twice.');
      }
      const ch = function () {
        ch.c(arguments);
      };
      ch.q = [] as any[];
      ch.c = function (args: any) {
        ch.q.push(args);
      };
      w.ChannelIO = ch;
      function l() {
        if (w.ChannelIOInitialized) {
          return;
        }
        w.ChannelIOInitialized = true;
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
        const x = document.getElementsByTagName('script')[0];
        if (x.parentNode) {
          x.parentNode.insertBefore(s, x);
        }
      }
      if (document.readyState === 'complete') {
        l();
      } else {
        w.addEventListener('DOMContentLoaded', l);
        w.addEventListener('load', l);
      }
    })();
  }

  boot(option: any, callback: () => void): void {
    (window as any).ChannelIO('boot', option, callback);
  }

  shutdown(): void {
    (window as any).ChannelIO('shutdown');
  }

  showMessenger(): void {
    (window as any).ChannelIO('showMessenger');
  }

  hideMessenger(): void {
    (window as any).ChannelIO('hideMessenger');
  }

  openChat(chatId: string, message: string): void {
    (window as any).ChannelIO('openChat', chatId, message);
  }

  track(eventName: string, eventProperty: any): void {
    (window as any).ChannelIO('track', eventName, eventProperty);
  }

  onShowMessenger(callback: () => void): void {
    (window as any).ChannelIO('onShowMessenger', callback);
  }

  onHideMessenger(callback: () => void): void {
    (window as any).ChannelIO('onHideMessenger', callback);
  }

  onBadgeChanged(callback: (badgeCount: number) => void): void {
    (window as any).ChannelIO('onBadgeChanged', callback);
  }

  onChatCreated(callback: (chatId: string) => void): void {
    (window as any).ChannelIO('onChatCreated', callback);
  }

  onFollowUpChanged(callback: (followUp: boolean) => void): void {
    (window as any).ChannelIO('onFollowUpChanged', callback);
  }

  onUrlClicked(callback: (url: string) => void): void {
    (window as any).ChannelIO('onUrlClicked', callback);
  }

  clearCallbacks(): void {
    (window as any).ChannelIO('clearCallbacks');
  }

  updateUser(userInfo: any, callback: () => void): void {
    (window as any).ChannelIO('updateUser', userInfo, callback);
  }

  addTags(tags: string[], callback: () => void): void {
    (window as any).ChannelIO('addTags', tags, callback);
  }

  removeTags(tags: string[], callback: () => void): void {
    (window as any).ChannelIO('removeTags', tags, callback);
  }

  setPage(page: string): void {
    (window as any).ChannelIO('setPage', page);
  }

  resetPage(): void {
    (window as any).ChannelIO('resetPage');
  }

  showChannelButton(): void {
    (window as any).ChannelIO('showChannelButton');
  }

  hideChannelButton(): void {
    (window as any).ChannelIO('hideChannelButton');
  }

  setAppearance(appearance: any): void {
    (window as any).ChannelIO('setAppearance', appearance);
  }
}

export default new ChannelService();
