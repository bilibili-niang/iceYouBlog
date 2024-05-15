export default {
  props: {
    test: {
      type: String,
      default: "test String"
    },
    fatherWord: {
      type: String,
      default: "父级的话"
    }
  },
  emit: ["sonMsg"],
  render(h) {
    return (
      <div className="testCom">
        <p>vue 使用 jsx</p>
        这个是props中的文字:{this.test}
        <br/>
        父级的话:
        {this.fatherWord}
        <button onClick={() => this.$emit("sonMsg", "传给父级的话")}>click</button>
      </div>
    );
  },
};
