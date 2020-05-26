Array.prototype.clean = function() {
    for (var i = 0; i < this.length; i++) {
        var subarray = this[i];
        for (var j = 0; j < subarray.length; j++) {
            if (subarray[j] == null || subarray[j] == "") {
                subarray.splice(j, 1);
                j--;
            }
        }

        //remove empty subarray
        if(subarray.length == 0) {
            this.splice(i,1);
            i--;
        }
    }
    return this;
};

Array.prototype.toAssoc = function() {
    var assoc = {};
    var me = this;
    this.forEach(function(val, i) {
        assoc[me[i][0]] = me[i][1];
    });
    return assoc;
};

Array.prototype.toAssocField = function() {
    var rows = [];
    var me = this;
    this.forEach(function(val, i) {
        if(i!=0) { //skip header
            var row = {};
            me[i].forEach(function(val2, j) {
                row[me[0][j]] = me[i][j];
            });
            rows.push(row);
        }
    });
    return rows;
};

Object.prototype.toPHPArrayShort = Array.prototype.toPHPArrayShort = function() {
    return JSON.stringify(this)
        .replaceAll('{', '[').replaceAll('}', ']')
        .replaceAll(':', '=>');
};

Object.prototype.toPHPArray = Array.prototype.toPHPArray = function() {
    return JSON.stringify(this)
        .replaceAll('{', 'array(').replaceAll('}', ')')
        .replaceAll('[', 'array(')
        .replaceAll(']', ')')
        .replaceAll(':', '=>');
};

Array.prototype.groupedBy = function(key) {
    if(key) {
        var assoc = {};
        var me = this;
        this.forEach(function(item) {
            var val = item[key];
            if(!assoc[val]) assoc[val] = [item];
            else assoc[val].push(item);
        });
        return assoc;
    } else {
        return this;
    }
};

Array.prototype.uniqueArray = function() {
    var uniqObj = {};
    this.forEach(function (item) {
        uniqObj[JSON.stringify(item)] = 1;
    });

    var uniqArray = [];
    for(var key in uniqObj) {
        if (uniqObj.hasOwnProperty(key)) {
            uniqArray.push(JSON.parse(key))
        }
    }
    return uniqArray;
};

String.prototype.replaceAll = function(search, replacement) {
    return this.split(search).join(replacement);
//        return this.replace(new RegExp(search, 'g'), replacement); //must handle special char : eg [ => \\[
};

$$ = function(id) {
    if(id[0] == '#')
        return document.getElementById(id.substr(1));
    else if(id[0] == '.')
        return document.getElementsByClassName(id.substr(1));
};