(()=>{"use strict";const e=window.React;wp.blocks.registerBlockType("kwplugin/simple-gallery",{title:"My Simple Image Gallery",icon:"format-gallery",category:"common",attributes:{arrIds:{type:"array"}},edit:function(t){let n,i;return(0,e.createElement)("div",null,(0,e.createElement)("input",{id:"choose",type:"button",name:"choose",className:"choose",value:"Choose Image",onClick:function(e){e.preventDefault(),n=wp.media({title:"Select an image",button:{text:"Use this image"},multiple:!0}),n.on("select",(function(){i=n.state().get("selection").map((function(e){return e.toJSON(),e.attributes.id})),t.setAttributes({arrIds:i})})),n.open()}}))},save:function(e){return null}})})();