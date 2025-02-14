
import { HDOM_TYPE, HDOM_INFO } from './constants';

export class DomNode {
  nodetype: number;
  tag: string;
  attr: Record<string, string>;
  children: DomNode[];
  nodes: DomNode[];
  parent: DomNode | null;
  private _: Record<number, any>;
  tag_start: number;
  private dom: any;

  constructor(dom: any) {
    this.nodetype = HDOM_TYPE.TEXT;
    this.tag = 'text';
    this.attr = {};
    this.children = [];
    this.nodes = [];
    this.parent = null;
    this._ = {};
    this.tag_start = 0;
    this.dom = dom;
    
    if (dom) {
      dom.nodes.push(this);
    }
  }

  clear(): void {
    this.dom = null;
    this.nodes = [];
    this.parent = null;
    this.children = [];
  }

  hasChild(): boolean {
    return this.children.length > 0;
  }

  firstChild(): DomNode | null {
    return this.children.length > 0 ? this.children[0] : null;
  }

  lastChild(): DomNode | null {
    return this.children.length > 0 ? this.children[this.children.length - 1] : null;
  }

  nextSibling(): DomNode | null {
    if (!this.parent) return null;
    const idx = this.parent.children.indexOf(this);
    return idx !== -1 && this.parent.children[idx + 1] 
      ? this.parent.children[idx + 1] 
      : null;
  }

  prevSibling(): DomNode | null {
    if (!this.parent) return null;
    const idx = this.parent.children.indexOf(this);
    return idx > 0 ? this.parent.children[idx - 1] : null;
  }

  findAncestorTag(tag: string): DomNode | null {
    if (!this.parent) return null;
    let ancestor: DomNode | null = this.parent;

    while (ancestor) {
      if (ancestor.tag === tag) {
        return ancestor;
      }
      ancestor = ancestor.parent;
    }

    return null;
  }

  innerText(): string {
    if (this._[HDOM_INFO.INNER] !== undefined) {
      return this._[HDOM_INFO.INNER];
    }

    if (this._[HDOM_INFO.TEXT] !== undefined) {
      return this.dom.restoreNoise(this._[HDOM_INFO.TEXT]);
    }

    let ret = '';
    this.nodes.forEach(n => {
      ret += n.outerText();
    });

    return ret;
  }

  outerText(): string {
    if (this.tag === 'root') {
      return this.innerText();
    }

    if (this._[HDOM_INFO.OUTER] !== undefined) {
      return this._[HDOM_INFO.OUTER];
    }

    if (this._[HDOM_INFO.TEXT] !== undefined) {
      return this.dom.restoreNoise(this._[HDOM_INFO.TEXT]);
    }

    let ret = '';

    if (this.dom && this.dom.nodes[this._[HDOM_INFO.BEGIN]]) {
      ret = this.dom.nodes[this._[HDOM_INFO.BEGIN]].makeup();
    }

    if (this._[HDOM_INFO.INNER] !== undefined) {
      if (this.tag !== 'br') {
        ret += this._[HDOM_INFO.INNER];
      }
    } else if (this.nodes) {
      this.nodes.forEach(n => {
        ret += this.convertText(n.outerText());
      });
    }

    if (this._[HDOM_INFO.END] && this._[HDOM_INFO.END] !== 0) {
      ret += '</' + this.tag + '>';
    }

    return ret;
  }

  private convertText(text: string): string {
    return text;
  }
}
