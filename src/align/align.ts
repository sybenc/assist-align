import {AlignLineData, AlignLineType} from "./type";
import d3, {DomSelection} from "../d3";
import {Store} from "@sybenc/freemove-types";
import {alignTypes} from "./const";
import {align_alternate} from "./align_alternate";
import {align_absorb} from "./align_absorb";
import {align_draw} from "./align_draw";

export class Align {
  store: Store
  g: DomSelection;
  lines: Record<AlignLineType | "vertical", DomSelection>;
  alternate: Record<AlignLineType, AlignLineData[]> = {
    ht: [],
    hc: [],
    hb: [],
    vl: [],
    vc: [],
    vr: [],
  }

  constructor(store: Store) {
    this.store = store
    this.g = d3.create("g").attr("data-assist-type", "align")
    this.lines = {} as any;
    [...alignTypes, "vertical"].forEach((type) => {
      const line = d3.create("line")
          .attr("stroke", "red")
          .style("display", "none");
      this.g.node().append(line);
      this.lines[type as AlignLineType | "vertical"] = line;
    });
    store.assist.node().append(this.g.node())
  }

  render() {
    align_alternate.call(this)
    align_absorb.call(this)
    align_draw.call(this)
  }
}