import {Align} from "./align";
import {align_alternate} from "./align_alternate";

export function align_absorb(this: Align) {
  const store = this.store
  // 节点吸附
  Object.values(this.alternate).flat().forEach(data => {
    const {diff, type} = data;
    const selected = store.selectedRect
    switch (type) {
      case "ht":
        selected.y = diff
        break;
      case "hc":
        selected.y = diff - selected.h / 2
        break;
      case "hb":
        selected.y = diff - selected.h
        break;
      case "vl":
        selected.x = diff
        break;
      case "vc":
        selected.x = diff - selected.w / 2
        break;
      case "vr":
        selected.x = diff - selected.w
        break;
    }
    // 更改了被选择元素的位置，所以需要重新寻找备选节点
    align_alternate.call(this)
  })

  // 容器吸附
  const selected = store.selectedRect
  if (!selected.parent) return
  const container = selected.parent
  const to = container.w / store.transform.scale / 2
  if (selected.x + selected.w / 2 - to <= 3) {
    selected.x = to - selected.w / 2
    // 更改了被选择元素的位置，所以需要重新寻找备选节点
    align_alternate.call(this)
  }
}