/**
 * params vertex顶点数组
 */
export default class AjoinMatrix {
	constructor(vertex) {
		this.vertex = vertex;
		this.quantity = this.vertex.length;
		this.adjoinArray = [];
		this.init();
	}
	
	init() {
		this.adjoinArray = Array(this.quantity * this.quantity).fill(0);
	}

	/*
	 * @param id string
	 * @param sides Array<string>
	 *  传入一个顶点，和当前顶点可达的顶点数组，将对应位置置为1
	*/
	setAdjoinVertex(id, sides) {
		const pIndex = this.vertex.indexOf(id);
		sides.forEach((item) => {
			const index = this.vertex.indexOf(item);
			this.adjoinArray[pIndex * this.quantity + index] = 1;
		})
	}

	/*
   	 * @param id string
   	 * 传入顶点的值，获取该顶点的列
   	 */
	getVertexCol(id) {
		const pIndex = this.vertex.indexOf(id);
		const col = [];
		this.vertex.forEach((item, index) => {
			col.push(this.adjoinArray[pIndex + index * this.quantity]);
		});
		return col;
	}

	/*
   	 * @param params Array<string>
   	 * 传入一个顶点数组，求出该数组所有顶点的列的合
   	 */
	getColSum(params) {
		const paramsVertex = params.map((id) => this.getVertexCol(id));
		const paramsVertexSum = [];
		this.vertex.forEach((item, index) => {
			const rowtotal = paramsVertex
				.map((value) => value[index])
				.reduce((total, current) => { 
					total += current || 0;
					return total;
				}, 0);
			paramsVertexSum.push(rowtotal);
		});
		return paramsVertexSum;
	}

	/*
   	 *  @param params Array<string>
   	 * 传入一个顶点数组，求出并集
   	 */
	getCollection(params) {
		const paramsColSum = this.getColSum(params);
		let collections = [];
		paramsColSum.forEach((item, index) => {
			if (item && this.vertex[index]) {
				collections.push(this.vertex[index]);
			}
		});
		return collections;
	}

	/*
   	 *  @param params Array<string>
   	 * 传入一个顶点数组，求出交集
   	 */
	getUnions(params) {
		const paramsColSum = this.getColSum(params);
		let unions = [];
		paramsColSum.forEach((item, index) => {
			if (item >= params.length && this.vertex[index]) {
				unions.push(this.vertex[index]);
			}
		});
		return unions;
	}
}