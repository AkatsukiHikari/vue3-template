/*
 * @Author: hikari
 * @Date: 2022-04-10 18:08:43
 * @LastEditTime: 2022-04-10 18:39:55
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /cloud-desktop-plus/src/utils/dragable.ts
 */
export class Draggable {
    ele:HTMLElement;
    startLeft: number | undefined;
    startTop: number | undefined;
    startY:number | undefined;
    startX: number | undefined;
    constructor(el:HTMLElement) {
      this.ele = el
      el.onmousedown = this.down.bind(this)
    }
    down(e:MouseEvent) {
      this.ele.style.transition = 'none'
      this.startLeft = this.ele.offsetLeft
      this.startTop = this.ele.offsetTop
      this.startX = e.pageX
      this.startY = e.pageY
      document.onmousemove = this.move.bind(this)
      document.onmouseup = this.up.bind(this)
    }
    move(e:MouseEvent) {
      const curLeft = e.pageX - (this.startX as number) + (this.startLeft as number),
        curTop = e.pageY - (this.startY as number) + (this.startTop as number);
      this.ele.style.left = curLeft + 'px';
      this.ele.style.top = curTop + 'px';
    }
    up() {
      document.onmousemove = null
      document.onmouseup = null
      this.ele.style.transition = 'all 200ms ease-in'
    }
}