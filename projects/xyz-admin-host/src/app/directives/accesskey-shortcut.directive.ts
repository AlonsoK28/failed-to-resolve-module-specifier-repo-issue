import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[accesskeyShortcut]'
})
export class AccesskeyShortcutDirective implements OnInit {

  @Input('accesskeyShortcut') accesskeyShortcut!: string; // Shortcut key from input

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    if (!this.accesskeyShortcut) {
      console.warn('accesskeyShortcut is undefined on', this.el.nativeElement);
      return;
    }

    const os = this.getOS();
    const browser = this.getBrowser();
    let shortcutLabel = this.accesskeyShortcut;

    if (os === 'MacOS') {
      shortcutLabel = `⌃ + ⌥ + ${this.accesskeyShortcut}`;
    } else if (os === 'Windows' || os === 'Linux') {
      shortcutLabel = `Alt + ${this.accesskeyShortcut}`;
    }

    this.el.nativeElement.innerHTML += ` (${shortcutLabel})`;
  }

  private getOS(): string {
    const platform = window.navigator.userAgent.toLowerCase();
    if (platform.includes('mac')) return 'MacOS';
    if (platform.includes('win')) return 'Windows';
    if (platform.includes('linux')) return 'Linux';
    return 'Unknown';
  }

  private getBrowser(): string {
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.includes('chrome') && !userAgent.includes('edg')) return 'Chrome';
    if (userAgent.includes('firefox')) return 'Firefox';
    if (userAgent.includes('safari') && !userAgent.includes('chrome')) return 'Safari';
    if (userAgent.includes('edg')) return 'Edge';
    return 'Unknown';
  }

}
