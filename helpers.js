
if (typeof process === 'object') {
  var path = require('path');
  var helpers = require(path.join(__dirname, 'node_modules', 'assets', 'public', 'helpers'));
  var Handlebars = require('handlebars');
}

if (helpers == undefined) { 
  var helpers = {};
}



helpers.a = function() {
  var args = Object.keys(arguments).map((index) => { 
    return arguments[index]
  }).filter((item) => {
    return typeof item == 'string'
  })
  
  var name = args.shift();

  var link = "<a " + args.reduce((string, part) => {
    var appendEquals = false;

    if (string[string.length-1] != '=') { 
      appendEquals = true;
    }
    
    //part = Handlebars.escapeExpression(part)

    if (appendEquals) {
      string.push(part);
      string.push('=');  
    } else {
      if (typeof part == 'string') {
        string.push("'"+part+"'");
      } else {
        string.push(part);
      }
    }
    
    return string;
  }, []).join('') + ">" + Handlebars.escapeExpression(name) + "</a>";
  
  return new Handlebars.SafeString(link);
}

helpers.script = function() {
  var args = Object.keys(arguments).map((index) => { 
    return arguments[index];
  }).filter((item) => {
    return typeof item == 'string';
  })
  
  var scripts = args.reduce((stack, url) => {
    stack.push('<script src="'+Handlebars.escapeExpression(url)+'"></script>');

    return stack;
  }, []).join('\n');
  

  return new Handlebars.SafeString(scripts)
}

helpers.style = function() {
  var args = Object.keys(arguments).map((index) => { 
    return arguments[index];
  }).filter((item) => {
    return typeof item == 'string';
  })
  
  var sheets = args.reduce((stack, url) => {
    stack.push('<link rel="stylesheet" href="'+Handlebars.escapeExpression(url)+'">');

    return stack;
  }, []).join('\n');

  return new Handlebars.SafeString(sheets)
}







if (module != undefined) {
  module.exports = helpers;
}

