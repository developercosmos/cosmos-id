import { HDOM_TYPE, HDOM_INFO, HDOM_QUOTE, HdomType, HdomInfo } from './constants';

export class DomNode {
  nodetype: HdomType;
  tag: string;
  attr: Record<string, string | boolean>;
  children: DomNode[];
  nodes: DomNode[];
  parent: DomNode | null;
  private _: Record<HdomInfo | number, any>;
  tag_start: number;
  private dom: any;
  private root?: DomNode;

  constructor(dom: any) {
    this.nodetype = HDOM_TYPE.TEXT;
    this.tag = 'text';
    this.attr = {};
    this.children = [];
    this.nodes = [];
    this.parent = null;
    this._ = {} as Record<HdomInfo | number, any>;
    this.tag_start = 0;
    this.dom = dom;
    
    if (dom) {
      dom.nodes.push(this);
    }
  }

  clear(): void {
    // Clear child nodes to prevent memory leaks
    if (this.children) {
      for (const child of this.children) {
        child.clear();
      }
      this.children = [];
    }

    if (this.parent) {
      this.parent.clear();
      this.parent = null;
    }

    if (this.root) {
      this.root.clear();
      this.root = undefined;
    }

    this.dom = null;
    this.nodes = [];
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

  text(): string {
    const innerInfo = HDOM_INFO.INNER as number;
    if (this._[innerInfo] !== undefined) {
      return this._[innerInfo];
    }

    if (this.nodetype === HDOM_TYPE.ROOT) {
      return '';
    }

    switch (this.nodetype) {
      case HDOM_TYPE.TEXT: return this.dom.restoreNoise(this._[HDOM_INFO.TEXT]);
      case HDOM_TYPE.COMMENT: return '';
      case HDOM_TYPE.UNKNOWN: return '';
    }

    if (this.tag.toLowerCase() === 'script') return '';
    if (this.tag.toLowerCase() === 'style') return '';

    let ret = '';

    if (this.nodes) {
      for (const n of this.nodes) {
        ret += this.convertText(n.text());
        if (n.tag === 'span') {
          ret += this.dom.defaultSpanText;
        }
      }
    }

    return ret;
  }

  xmlText(): string {
    const ret = this.innerText();
    return ret.replace(/<!\[CDATA\[/gi, '').replace(/\]\]>/g, '');
  }

  makeup(): string {
    if (this._[HDOM_INFO.TEXT] !== undefined) {
      return this.dom.restoreNoise(this._[HDOM_INFO.TEXT]);
    }

    let ret = '<' + this.tag;
    let i = -1;

    for (const [key, val] of Object.entries(this.attr)) {
      i++;

      // skip removed attribute
      if (val === null || val === false) continue;

      ret += this._[HDOM_INFO.SPACE]?.[i]?.[0] || '';

      // no value attr: nowrap, checked selected...
      if (val === true) {
        ret += key;
      } else {
        let quote = '';
        switch (this._[HDOM_INFO.QUOTE]?.[i]) {
          case HDOM_QUOTE.DOUBLE: quote = '"'; break;
          case HDOM_QUOTE.SINGLE: quote = '\''; break;
          default: quote = '';
        }

        ret += key +
          (this._[HDOM_INFO.SPACE]?.[i]?.[1] || '') +
          '=' +
          (this._[HDOM_INFO.SPACE]?.[i]?.[2] || '') +
          quote + val + quote;
      }
    }

    ret = this.dom.restoreNoise(ret);
    return ret + (this._[HDOM_INFO.ENDSPACE] || '') + '>';
  }

  find(selector: string, idx: number | null = null, lowercase = false): DomNode[] | DomNode | null {
    const selectors = this.parseSelector(selector);
    if (selectors.length === 0) return [];

    const foundKeys: Record<string, number> = {};

    // find each selector
    for (const selectorGroup of selectors) {
      const level = selectorGroup.length;
      if (level === 0 || typeof this._[HDOM_INFO.BEGIN] === 'undefined') return [];

      let head: Record<string, number> = { [this._[HDOM_INFO.BEGIN].toString()]: 1 };
      let cmd = ' '; // Combinator

      // handle descendant selectors, no recursive!
      for (let l = 0; l < level; l++) {
        const ret: Record<string, number> = {};

        for (const k of Object.keys(head)) {
          const n = k === '-1' ? this.dom.root : this.dom.nodes[k];
          n.seek(selectorGroup[l], ret, cmd, lowercase);
        }

        head = ret;
        cmd = selectorGroup[l][4]; // Next Combinator
      }

      for (const k of Object.keys(head)) {
        foundKeys[k] = 1;
      }
    }

    // sort keys
    const sortedKeys = Object.keys(foundKeys).sort((a, b) => Number(a) - Number(b));
    const found = sortedKeys.map(k => this.dom.nodes[k]);

    // return nth-element or array
    if (idx === null) return found;
    if (idx < 0) idx = found.length + idx;
    const foundNode = found[idx];
    return foundNode || null;
  }

  protected seek(
    selector: [string, string, string[], any[], string],
    ret: Record<string, number>,
    parentCmd: string,
    lowercase = false
  ): void {
    const [tag, id, cssClass, attributes, cmb] = selector;
    let nodes: DomNode[] = [];

    if (parentCmd === ' ') { // Descendant Combinator
      let end = this._[HDOM_INFO.END] || 0;
      if (end === 0) {
        let parent = this.parent;
        while (parent && !parent._[HDOM_INFO.END]) {
          end--;
          parent = parent.parent;
        }
        if (parent) {
          end += parent._[HDOM_INFO.END];
        }
      }

      const nodesStart = this._[HDOM_INFO.BEGIN] + 1;
      const nodesCount = end - nodesStart;
      nodes = this.dom.nodes.slice(nodesStart, nodesStart + nodesCount);
    } else if (parentCmd === '>') { // Child Combinator
      nodes = this.children;
    } else if (parentCmd === '+' && 
               this.parent && 
               this.parent.children.includes(this)) { // Next-Sibling Combinator
      const index = this.parent.children.indexOf(this) + 1;
      if (index < this.parent.children.length) {
        nodes.push(this.parent.children[index]);
      }
    } else if (parentCmd === '~' && 
               this.parent && 
               this.parent.children.includes(this)) { // Subsequent Sibling Combinator
      const index = this.parent.children.indexOf(this);
      nodes = this.parent.children.slice(index + 1);
    }

    for (const node of nodes) {
      let pass = true;

      // Skip root nodes
      if (!node.parent) {
        pass = false;
      }

      // Handle 'text' selector
      if (pass && tag === 'text' && node.tag === 'text') {
        const idx = this.dom.nodes.indexOf(node);
        if (idx !== -1) ret[idx] = 1;
        continue;
      }

      // Skip if node isn't a child node (i.e. text nodes)
      if (pass && !node.parent?.children.includes(node)) {
        pass = false;
      }

      // Skip if tag doesn't match
      if (pass && tag !== '' && tag !== node.tag && tag !== '*') {
        pass = false;
      }

      // Skip if ID doesn't exist
      if (pass && id !== '' && !node.attr['id']) {
        pass = false;
      }

      // Check if ID matches
      if (pass && id !== '' && node.attr['id']) {
        const nodeId = typeof node.attr['id'] === 'string' ? node.attr['id'].split(' ')[0] : '';
        if (id !== nodeId) pass = false;
      }

      // Check if all class(es) exist
      if (pass && cssClass && cssClass.length > 0) {
        const classAttr = node.attr['class'];
        if (typeof classAttr === 'string') {
          const nodeClasses = lowercase 
            ? classAttr.toLowerCase().split(' ')
            : classAttr.split(' ');

          for (const c of cssClass) {
            if (!nodeClasses.includes(c)) {
              pass = false;
              break;
            }
          }
        } else {
          pass = false;
        }
      }

      // Found a match
      if (pass && node._[HDOM_INFO.BEGIN]) {
        ret[node._[HDOM_INFO.BEGIN]] = 1;
      }
    }
  }

  protected match(exp: string, pattern: string, value: string | boolean, caseSensitivity: string): boolean {
    if (typeof value !== 'string') return false;
    
    let patternStr = pattern;
    let valueStr = value;

    if (caseSensitivity === 'i') {
      patternStr = patternStr.toLowerCase();
      valueStr = valueStr.toLowerCase();
    }

    switch (exp) {
      case '=': return valueStr === patternStr;
      case '!=': return valueStr !== patternStr;
      case '^=': return valueStr.startsWith(patternStr);
      case '$=': return valueStr.endsWith(patternStr);
      case '*=': return valueStr.includes(patternStr);
      case '|=': return valueStr === patternStr || valueStr.startsWith(patternStr + '-');
      case '~=': return valueStr.split(/\s+/).includes(patternStr);
      default: return false;
    }
  }

  private parseSelector(selectorString: string): Array<[string, string, string[], any[], string]> {
    const selectors: Array<[string, string, string[], any[], string]> = [];
    const pattern = /([\w:\*-]*)(?:\#([\w-]+))?(?:|\.([\w\.-]+))?((?:\[@?(?:!?[\w:-]+)(?:(?:[!*^$|~]?=)[\"']?(?:.*?)[\"']?)?(?:\s*?(?:[iIsS])?)?\])+)?([\/, >+~]+)/i;
    
    const matches = Array.from(selectorString.trim().matchAll(new RegExp(pattern, 'g')));
    
    let result: [string, string, string[], any[], string][] = [];
    
    for (const match of matches) {
      const [fullMatch, tag, id, classes, attrs, separator] = match;
      
      if (!fullMatch.trim() || fullMatch === '/' || fullMatch === '//') continue;
      
      const processedClasses = classes ? classes.split('.').filter(Boolean) : [];
      
      const attributes = attrs ? this.parseAttributes(attrs) : [];
      
      result.push([
        tag || '',
        id || '',
        processedClasses,
        attributes,
        separator ? separator.trim() || ' ' : ' '
      ]);
      
      if (separator === ',') {
        selectors.push(...result);
        result = [];
      }
    }
    
    if (result.length > 0) {
      selectors.push(...result);
    }
    
    return selectors;
  }

  private parseAttributes(attrString: string): any[] {
    const pattern = /\[@?(!?[\w:-]+)(?:([!*^$|~]?=)[\"']?(.*?)[\"']?)?(?:\s+?([iIsS])?)?\]/i;
    const matches = Array.from(attrString.matchAll(new RegExp(pattern, 'g')));
    
    return matches.map(match => {
      const [, name, expr, value, sensitivity] = match;
      const inverted = name.startsWith('!');
      return [
        inverted ? name.slice(1) : name,
        expr || '',
        value || '',
        inverted,
        sensitivity ? sensitivity.toLowerCase() : ''
      ];
    });
  }

  convertText(text: string): string {
    if (!this.dom) return text;

    const sourceCharset = this.dom._charset?.toUpperCase();
    const targetCharset = this.dom._target_charset?.toUpperCase();

    if (!sourceCharset || !targetCharset || sourceCharset === targetCharset) {
      return text;
    }

    if (targetCharset === 'UTF-8' && this.isUtf8(text)) {
      return text;
    }

    try {
      const encoder = new TextEncoder();
      const decoder = new TextDecoder(targetCharset);
      const bytes = encoder.encode(text);
      return decoder.decode(bytes);
    } catch (e) {
      return text;
    }
  }

  private isUtf8(str: string): boolean {
    try {
      const encoder = new TextEncoder();
      const decoder = new TextDecoder('utf-8', { fatal: true });
      const bytes = encoder.encode(str);
      decoder.decode(bytes);
      return true;
    } catch {
      return false;
    }
  }

  save(filepath: string = ''): string {
    const ret = this.outerText();
    return ret;
  }

  addClass(className: string | string[]): void {
    const classesToAdd = Array.isArray(className) ? className : className.split(' ');
    
    for (const c of classesToAdd) {
      const currentClass = this.attr['class'];
      if (typeof currentClass === 'string') {
        if (!this.hasClass(c)) {
          this.attr['class'] = `${currentClass} ${c}`.trim();
        }
      } else {
        this.attr['class'] = c;
      }
    }
  }

  hasClass(className: string): boolean {
    const currentClass = this.attr['class'];
    if (typeof currentClass === 'string') {
      return currentClass.split(' ').includes(className);
    }
    return false;
  }

  removeClass(className?: string | string[]): void {
    const currentClass = this.attr['class'];
    if (typeof currentClass !== 'string') {
      return;
    }

    if (!className) {
      delete this.attr['class'];
      return;
    }

    const currentClasses = currentClass.split(' ');
    const classesToRemove = Array.isArray(className) ? className : className.split(' ');
    
    const remainingClasses = currentClasses.filter(c => !classesToRemove.includes(c));
    if (remainingClasses.length === 0) {
      delete this.attr['class'];
    } else {
      this.attr['class'] = remainingClasses.join(' ');
    }
  }

  getAllAttributes(): Record<string, string | boolean> {
    return this.attr;
  }

  getAttribute(name: string): string | boolean | undefined {
    return this.attr[name];
  }

  setAttribute(name: string, value: string | boolean): void {
    this.attr[name] = value;
  }

  hasAttribute(name: string): boolean {
    return name in this.attr;
  }

  removeAttribute(name: string): void {
    delete this.attr[name];
  }

  remove(): void {
    if (this.parent) {
      this.parent.removeChild(this);
    }
  }

  removeChild(node: DomNode): void {
    const nidx = this.nodes.indexOf(node);
    const cidx = this.children.indexOf(node);
    const didx = this.dom.nodes.indexOf(node);

    if (nidx !== -1 && cidx !== -1 && didx !== -1) {
      for (const child of [...node.children]) {
        node.removeChild(child);
      }

      for (const entity of [...node.nodes]) {
        const enidx = node.nodes.indexOf(entity);
        const edidx = node.dom.nodes.indexOf(entity);

        if (enidx !== -1 && edidx !== -1) {
          node.nodes.splice(enidx, 1);
          node.dom.nodes.splice(edidx, 1);
        }
      }

      this.nodes.splice(nidx, 1);
      this.children.splice(cidx, 1);
      this.dom.nodes.splice(didx, 1);

      node.clear();
    }
  }

  getElementById(id: string): DomNode | null {
    return this.find(`#${id}`, 0) as DomNode | null;
  }

  getElementsById(id: string, idx: number | null = null): DomNode[] | DomNode | null {
    return this.find(`#${id}`, idx);
  }

  getElementByTagName(name: string): DomNode | null {
    const result = this.find(name, 0);
    if (result instanceof DomNode) {
      return result;
    }
    return null;
  }

  getElementsByTagName(name: string, idx: number | null = null): DomNode[] | DomNode | null {
    const result = this.find(name, idx);
    
    if (idx === null) {
      if (Array.isArray(result)) {
        return result;
      }
      return [];
    }
    
    return result instanceof DomNode ? result : null;
  }

  parentNode(): DomNode | null {
    return this.parent;
  }

  childNodes(idx: number = -1): DomNode[] | DomNode | null {
    return idx === -1 ? this.children : (this.children[idx] || null);
  }

  hasChildNodes(): boolean {
    return this.hasChild();
  }

  nodeName(): string {
    return this.tag;
  }

  appendChild(node: DomNode): DomNode {
    node.parent = this;
    this.nodes.push(node);
    this.children.push(node);
    return node;
  }

  getDisplaySize(): { width: number; height: number } | false {
    if (this.tag !== 'img') {
      return false;
    }

    let width = -1;
    let height = -1;

    const widthAttr = this.attr['width'];
    if (typeof widthAttr === 'string') {
      width = parseInt(widthAttr, 10);
    }

    const heightAttr = this.attr['height'];
    if (typeof heightAttr === 'string') {
      height = parseInt(heightAttr, 10);
    }

    const styleAttr = this.attr['style'];
    if (typeof styleAttr === 'string') {
      const matches = Array.from(styleAttr.matchAll(/([\w-]+)\s*:\s*([^;]+)\s*;?/g));
      
      const styles = Object.fromEntries(
        matches.map(([, prop, value]) => [prop, value.trim()])
      );

      if (styles['width'] && width === -1) {
        const match = styles['width'].match(/^(\d+)px$/i);
        if (match) {
          width = parseInt(match[1], 10);
        }
      }

      if (styles['height'] && height === -1) {
        const match = styles['height'].match(/^(\d+)px$/i);
        if (match) {
          height = parseInt(match[1], 10);
        }
      }
    }

    return width !== -1 || height !== -1 ? { width, height } : false;
  }

  protected parseCharset(): string {
    let charset = '';

    // Try to find charset in meta tags
    const metaCharset = this.find('meta[charset]', 0);
    if (metaCharset && metaCharset instanceof DomNode) {
      const charsetAttr = metaCharset.getAttribute('charset');
      if (typeof charsetAttr === 'string') {
        charset = charsetAttr;
      }
    }

    // If no charset found, default to UTF-8
    if (!charset) {
      charset = 'UTF-8';
    }

    return charset;
  }
}
