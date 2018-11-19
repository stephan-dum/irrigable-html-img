const path = require("path");

module.exports = function({
  selector = 'img, input[type="image"], link[rel="icon"]'
} = {}) {
  return function(vinyl, context) {
    let { cwd, references } = vinyl;
    let parent = context.parent;

    return {
      selector,
      handle : (elem, vinyl) => {
        let srcset = elem.attr("srcset");

        if(srcset) {
          return parent.addInputs(
            vinyl,
            {
              glob : srcset.split(/[,]/g).map(
                (rule) => rule.trim().split(/\s/)[0]
              ),
            },
            true
          );
        }

        return parent.addInputs(
          vinyl,
          elem.attr("src") || elem.attr("href"),
          true
        );






        /*let srcset = elem.attr("srcset");

        references.push(...(
          srcset
            ?srcset.replace(/[\t\r\n]/g, "").split(/[ ,]/g).filter((a,i) => !(i%2))
            :[elem.attr("src")]
        ));*/
      }
    }
  }
}
