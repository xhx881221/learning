specList: [
    { title: "颜色", list: ["红色", "紫色"] },
    { title: "套餐", list: ["套餐一", "套餐二"] },
    { title: "内存", list: ["64G", "128G", "256G"] },
  ];

  specCombinationList: [
    { id: "1", specs: ["紫色", "套餐一", "64G"] },
    { id: "2", specs: ["紫色", "套餐一", "128G"] },
    { id: "3", specs: ["紫色", "套餐二", "128G"] },
    { id: "4", specs: ["红色", "套餐二", "256G"] }
  ]

import AdjoinMatrix from "./adjoin-matrix";

export default class SpecAdjoinMatrix extends AdjoinMatrix {
    constructor(specList, specCombinationList) {
        super(specList.reduce((total, current) => [...total, ...current.list], []));
        this.specList = specList;
        this.specCombinationList = specCombinationList;
        this.initSpec();
        this.initSameLevel();
    }

    initSpec() {
        this.specCombinationList.forEach((item) => {
            this.fillInSpec(item.specs);
        });
    }

    initSameLevel() {
        const specsOption = this.getCollection(this.vertex);
        this.specList.forEach((item) => {
            const params = [];
            item.list.forEach((value) => {
                if (specsOption.includes(value)) {
                    params.push(value);
                }
            });
            this.fillInSpec(params);
        });
    }

    getSpecscOptions(params) {
        let specOptionCanchoose = [];
        if (params.some(Boolean)) {
            specOptionCanchoose = this.getUnions(params.filter(Boolean));
        } else {
            specOptionCanchoose = this.getCollection(this.vertex);
        }
        return specOptionCanchoose;
    }

    fillInSpec(params) {
        params.forEach((param) => {
            this.setAdjoinVertex(param, params);
        });
    }
}