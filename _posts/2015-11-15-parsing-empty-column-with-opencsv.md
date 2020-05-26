---
id: 335
title: Parsing empty column with OpenCSV
date: 2015-11-15T22:18:03+02:00
author: remmel
layout: post
guid: http://www.remy-mellet.com/?p=335
permalink: /blog/335-parsing-empty-column-with-opencsv/
categories:
  - Uncategorized
---
Lets say you have the following 2 lines csv file :

> `jules,23<br />
thomas,`

And object :

> `Class Person {<br />
String name;<br />
Integer age;<br />
//getter + setter<br />
}`

When you use the java opencsv library to map that csv to the object, it will throw an exception :

> Caused by: java.lang.NumberFormatException: Zero length string at java.lang.Integer.decode(Integer.java:1162) at com.sun.beans.editors.IntegerEditor.setAsText(IntegerEditor.java:39) at au.com.bytecode.opencsv.bean.CsvToBean.convertValue(CsvToBean.java:82) at au.com.bytecode.opencsv.bean.CsvToBean.processLine(CsvToBean.java:63) at au.com.bytecode.opencsv.bean.CsvToBean.parse(CsvToBean.java:48) &#8230; 22 more

[doesn&#8217;t work!!!!] After looking at the source code I tried to add my custom PropertyEditor:

<pre>public class IntegerEmptyEditor extends NumberEditor {
    public IntegerEmptyEditor() {
    }
    public void setAsText(String var1) throws IllegalArgumentException {
        this.setValue(var1 == null || var1.equals("")?null:Integer.decode(var1));
    }
}

<span style="color: #222222; font-family: 'Courier 10 Pitch', Courier, monospace; line-height: 21px;">PropertyEditorManager.registerEditor(Integer.class, IntegerEmptyEditor.class);
</span><span style="color: #222222; font-family: 'Courier 10 Pitch', Courier, monospace; line-height: 21px;">PropertyEditor pe = PropertyEditorManager.findEditor(Integer.class);
//  BUT RETURN IntegerEditor instead of IntegerEmptyEditor</span></pre>

Instead, let&#8217;s treat all empty string value like null value :

<pre>CsvToBean csv = new CsvToBean() {
    protected Object convertValue(String value, PropertyDescriptor prop) throws InstantiationException, IllegalAccessException {
        if(StringUtils.isEmpty(value)) {
            value = null;
        }
        return super.convertValue(value, prop);
    }
};</pre>

Complete code mapping the csv file to the object :

<pre>CSVReader csvReader = new CSVReader(new FileReader("src/test/resources/utils/csv/person.csv"));
ColumnPositionMappingStrategy strat = new ColumnPositionMappingStrategy();
strat.setType(Person.class);
String[] columns = new String[] {"name", "age"};
strat.setColumnMapping(columns);
CsvToBean csv = new CsvToBean() {
    protected Object convertValue(String value, PropertyDescriptor prop) throws InstantiationException, IllegalAccessException {
        if(StringUtils.isEmpty(value)) {
            value = null;
        }
        return super.convertValue(value, prop);
    }
};
List&lt;StopExt&gt; list = csv.parse(strat, csvReader);
csvReader.close();</pre>