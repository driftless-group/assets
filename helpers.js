
if (typeof process === 'object') {
  var path = require('path');
  var Handlebars = require('handlebars');
}

if (helpers == undefined) { 
  var helpers = {};
}

// this is just an initial stab at it.  
// i think it might need to render handlebars etc.
//
// trying to allow a default if a translation doesnt exist
helpers.t = function(name, optionalDefault=undefined, options={}) {
  var string = '';
 
  if (typeof optionalDefault == 'object' && optionalDefault.name == 't') { 
    options = optionalDefault;
    optionalDefault = undefined;
  }

  if (options.data.root.translations[name] != undefined) {
    string = options.data.root.translations[name];
  } else if (optionalDefault != undefined) {
    string = optionalDefault;
  } else {
    string = name;
  }

  return string;
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


helpers.html = function() {
  return new Handlebars.SafeString([
    '<html lang="', 
    this.locale ,'"', 
    (this.dir == "rtl" ? ' dir="rtl"' : ""),
    ' >'
  ].join(''))
}


helpers.json = function(obj) {
  return new Handlebars.SafeString(JSON.stringify(obj));
}


helpers.hasRole = function(requiredRole, options) {
  if (options.data.root.auth != undefined && 
      options.data.root.auth.roles.indexOf(requiredRole) > -1) {
    
    return options.fn(this);
  } else if (options.inverse && options.inverse !== Handlebars.Utils.noop) { 
    return options.inverse(this);
  }     
};

helpers.hostname = function(name, options) {
  return new Handlebars.SafeString(options.data.root.urls.proto + "://" + options.data.root.urls[name]);
}



if (typeof module != 'undefined') {
  module.exports = helpers;
}

