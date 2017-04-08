import { Issue } from './issue';

export class BadgeView {
    static BADGE_HEIGHT = 20;
    static stateColors: { [key: string]: string; } = {
        open   : '6CC644',
        merged : '6E5494',
        closed : 'BD2C00'
    };

    constructor(
        private issue: Issue/* badgeHeight, labelWidth */,
        private maxNumberLength: number,
        private maxStateLength: number
    ) {}

    get badgeWidth() {
        const iconSize = this.badgeHeight;
        return this.numberWidth + this.stateWidth + ( iconSize * this.issue.assignees.length )/* + this.labelWidth */
    }
    get badgeHeight() {
        return BadgeView.BADGE_HEIGHT;
    }
    get numberWidth() { // not so correct :P
        return 15 + this.maxNumberLength * 9;
    }
    get stateWidth() { // not so correct :P
        return 10 + this.maxStateLength * 7;
    }
    get stateColor() {
        return BadgeView.stateColors[this.issue.state];
    }

    render() {
        const iconSize = this.badgeHeight;
        const icons = this.issue.assignees.map((user, idx) => `
            <image x="${this.numberWidth + this.stateWidth + iconSize * idx}" y="0"
                width="${iconSize}" height="${iconSize}"
                xlink:href="${user.avatar_url}"></image>
        `)

        return `<svg class="embed-badge" width="${this.badgeWidth}" height="${this.badgeHeight}" style="border-radius: 2px; vertical-align: middle; margin-right: 0.3em">
  <rect x="0" y="0" style="fill:#555"
        width="${this.numberWidth}" height="${this.badgeHeight}" />
  <rect x="${this.numberWidth}" y="0" style="fill:#${this.stateColor}"
        width="${this.stateWidth}" height="${this.badgeHeight}" />
  <rect x="${this.numberWidth + this.stateWidth}" y="0" style="fill:#999"
        width="${this.badgeWidth}" height="${this.badgeHeight}" />
  <!-- TODO: labels -->
  ${icons}
  <linearGradient id="cover" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" stop-color="#bbb" stop-opacity="0.10"></stop>
    <stop offset="100%" stop-color="#000" stop-opacity="0.10"></stop>
  </linearGradient>
  <rect x="0" y="0" width="${this.badgeWidth}" height="${this.badgeHeight}" style="fill:url(#cover)" />
  <g style="fill:#fff; text-anchor:middle; font-family:DejaVu Sans,Verdana,Geneva,sans-serif; font-size:11px">
    <text x="${this.numberWidth/2-2}" y="15" style="fill:#010101; fill-opacity: .3">${this.issue.number}</text>
    <text x="${this.numberWidth/2-2}" y="14">${this.issue.number}</text>
    <text x="${this.numberWidth+this.stateWidth/2}" y="15" style="fill:#010100; fill-opacity: .3">${this.issue.state}</text>
    <text x="${this.numberWidth+this.stateWidth/2}" y="14">${this.issue.state}</text>
  </g>
</svg>`
    }
}
