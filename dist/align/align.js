import d3 from "../d3";
import { alignTypes } from "./const";
import { align_alternate } from "./align_alternate";
import { align_absorb } from "./align_absorb";
import { align_draw } from "./align_draw";
export class Align {
    store;
    g;
    lines;
    alternate = {
        ht: [],
        hc: [],
        hb: [],
        vl: [],
        vc: [],
        vr: [],
    };
    constructor(store) {
        this.store = store;
        this.g = d3.create("g").attr("data-assist-type", "align");
        this.lines = {};
        [...alignTypes, "vertical"].forEach((type) => {
            const line = d3.create("line")
                .attr("stroke", "red")
                .style("display", "none");
            this.g.node().append(line);
            this.lines[type] = line;
        });
        store.assist.node().append(this.g.node());
    }
    render() {
        align_alternate.call(this);
        align_absorb.call(this);
        align_draw.call(this);
    }
}
