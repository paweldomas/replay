(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{"./src/replay/components/common.js":function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"k",(function(){return o})),n.d(t,"g",(function(){return r})),n.d(t,"d",(function(){return l})),n.d(t,"f",(function(){return i})),n.d(t,"h",(function(){return c})),n.d(t,"i",(function(){return m})),n.d(t,"j",(function(){return p})),n.d(t,"c",(function(){return h})),n.d(t,"b",(function(){return g})),n.d(t,"e",(function(){return y}));const a="replay-";function o(e,...t){const n=null==e?"":e,a=[];for(let o=0;o<t.length;o++)t[o]&&a.push(n+t[o]);return a.join(" ")}const s=e=>e;function r({classes:e,selectClasses:t,classNames:n,classNamePrefix:a}){if(e&&t){const n=t(e);return Array.isArray(n)?n.filter(s).join(" "):n}if(n)return o(a,...n)}function l(e,t){const n=(t||e.currentTarget).getBoundingClientRect();let a;return a=e.touches&&e.touches.length>0?e.touches[0]:e.changedTouches&&e.changedTouches.length>0?e.changedTouches[0]:e,{x:Math.max(0,Math.min(a.pageX-n.left,n.width)),y:Math.max(0,Math.min(a.pageY-n.top,n.height)),width:n.width,height:n.height}}function i(e){return t=>{e.indexOf(t.key)>=0&&(t.preventDefault(),t.stopPropagation())}}const c=(e,t)=>e!==t&&(!(e instanceof Date&&t instanceof Date&&e.getTime()===t.getTime())&&!(Number.isNaN(e)&&Number.isNaN(t))),d=e=>null!=e&&e.constructor==={}.constructor,m=(e,t)=>{if(e===t)return!0;if(d(e)&&d(t)){const n=Object.keys(e),a=Object.keys(t);return n.length===a.length&&(!(n.filter(n=>c(e[n],t[n])).length>0)&&0===a.filter(n=>c(t[n],e[n])).length)}if(Array.isArray(e)&&Array.isArray(t)&&e.length===t.length){for(let n=e.length;n--;)if(e[n]!==t[n])return!1;return!0}return!1};function u(e){if(null==e)return{};{const t={},n=e;return Object.keys(e).forEach(e=>{d(n[e])?t[e]=u(n[e]):t[e]=n[e]}),t}}function p(e,t){const n=u(e);if(t){const e=t;Object.getOwnPropertyNames(e).forEach(t=>{d(e[t])?d(n[t])?n[t]=p(n[t],e[t]):n[t]=u(e[t]):n[t]=e[t]})}return n}const f=(e,t="",n=!1,a=!0)=>n&&0===e?"":e<10&&a?"0".concat(e).concat(t):"".concat(e).concat(t),h=(e,t="-")=>{let n=Math.round(e),a="";"number"!==typeof e||isNaN(e)||e===1/0?n=0:n<0&&(n=-n,a=t);const o=Math.floor(n/86400),s=86400*o,r=Math.floor((n-s)/3600),l=s+3600*r,i=Math.floor((n-l)/60),c=n-l-60*i;return a+f(o,".",!0,!1)+f(r,":",0===o)+f(i,":",!1)+f(c)},g=e=>{const t=e instanceof Date&&!isNaN(e.getTime());let n=0,a=0,o=0;return t&&null!=e&&(n=t?e.getHours():0,a=t?e.getMinutes():0,o=t?e.getSeconds():0),f(n,":",!1)+f(a,":",!1)+f(o)},y=(e,t)=>{let n=null;return{start:()=>{n||(n=setInterval(e,1e3*t))},stop:()=>{n&&(clearInterval(n),n=null)}}}},"./src/replay/components/generic/Selector/Selector.js":function(e,t,n){"use strict";var a=n("./node_modules/react/index.js"),o=n("./src/replay/components/common.js"),s=n("./src/replay/components/generic/ToggleButton/ToggleButton.js");function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const l=e=>e.selectorItem,i=e=>e.selectorItemSelected||e.selectorItem;class c extends a.Component{constructor(...e){super(...e),r(this,"handleRef",e=>{this.props.onRef(e,this.props.index)}),r(this,"handleClick",()=>this.props.onSelect&&this.props.onSelect(this.props.item.data)),r(this,"handleKeyDown",Object(o.f)(["Enter"," "])),r(this,"handleKeyUp",e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this.handleClick())})}render(){const e=this.props,t=e.className,n=e.classNamePrefix,s=e.classes,r=e.defaultItemClassName,c=e.item,d=e.isSelected,m=e.canReceiveFocus,u=e.selectedClassName,p=c.label,f=Object(o.g)({classes:s,classNamePrefix:n,selectClasses:d?i:l,classNames:[t,r,d?u:null]}),h=m?0:void 0;return a.createElement("div",{role:"option","aria-selected":d,className:f,ref:this.handleRef,onClick:this.handleClick,onKeyDown:this.handleKeyDown,onKeyUp:this.handleKeyUp,tabIndex:h},a.createElement("div",{tabIndex:-1},p))}}function d(e,t,n,a){const o=(t?n.slice(0).reverse():n).concat(a);for(let s=0;s<o.length;s++)if(o[s]===document.activeElement)if(e){if(s>0)for(let e=s-1;e>=0;e--){const t=o[e];if(t)return t.focus(),t}}else if(s<o.length-1)for(let e=s+1;e<o.length;e++){const t=o[e];if(t)return t.focus(),t}}function m(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}c.__docgenInfo={description:"",methods:[{name:"handleRef",docblock:null,modifiers:[],params:[{name:"element",type:{name:"HTMLElement",nullable:!0}}],returns:null},{name:"handleClick",docblock:null,modifiers:[],params:[],returns:null},{name:"handleKeyUp",docblock:null,modifiers:[],params:[{name:"keyboardEvent",type:{name:"KeyboardEvent",alias:"KeyboardEvent"}}],returns:null}],displayName:"SelectorItem",props:{item:{required:!0,flowType:{name:"signature",type:"object",raw:"{\n  label: string,\n  id?: Id,\n  data?: any\n}",signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"id",value:{name:"Id",required:!1}},{key:"data",value:{name:"any",required:!1}}]}},description:""},index:{required:!0,flowType:{name:"number"},description:""},isSelected:{required:!0,flowType:{name:"boolean"},description:""},canReceiveFocus:{required:!0,flowType:{name:"boolean"},description:""},defaultItemClassName:{required:!0,flowType:{name:"string"},description:""},selectedClassName:{required:!0,flowType:{name:"string"},description:""},onSelect:{required:!1,flowType:{name:"signature",type:"function",raw:"any => void",signature:{arguments:[{name:"",type:{name:"any"}}],return:{name:"void"}}},description:""},onRef:{required:!0,flowType:{name:"signature",type:"function",raw:"(?HTMLElement, number) => void",signature:{arguments:[{name:"",type:{name:"HTMLElement",nullable:!0}},{name:"",type:{name:"number"}}],return:{name:"void"}}},description:""}}};const u=e=>e.selectorCollapsed||e.selector,p=e=>e.selectorExpanded||e.selector,f=e=>e.selectorItemsContainer;class h extends a.Component{constructor(e){super(e),m(this,"focusableItems",[]),m(this,"toggleElement",null),m(this,"onToggleRef",e=>{this.toggleElement=e}),m(this,"handleToggle",e=>this.setState({isExpanded:e})),m(this,"handleItemRef",(e,t)=>{this.focusableItems[t]=e}),m(this,"renderSelectorItem",(e,t)=>{const n=this.props.itemMapper(e);return a.createElement(c,{key:n.id,item:n,index:t,onSelect:this.props.onSelect,onRef:this.handleItemRef,isSelected:e===this.props.selectedItem,canReceiveFocus:this.state.isExpanded,selectedClassName:"selected",defaultItemClassName:"selector-item",className:this.props.itemClassName,classes:this.props.classes,classNamePrefix:this.props.classNamePrefix})}),m(this,"handleKeyDown",e=>{switch(e.key){case"ArrowUp":case"Up":return void e.preventDefault();case"ArrowDown":case"Down":return void(this.state.isExpanded&&e.preventDefault());default:return}}),m(this,"handleKeyUp",e=>{if(this.state.isExpanded){if("ArrowUp"!==e.key&&"Up"!==e.key||(e.preventDefault(),d(!0,this.props.reverseOrder||!1,this.focusableItems,this.toggleElement)),"ArrowDown"===e.key||"Down"===e.key){e.preventDefault(),d(!1,this.props.reverseOrder||!1,this.focusableItems,this.toggleElement)===this.toggleElement&&this.setState({isExpanded:!1})}}else"ArrowUp"!==e.key&&"Up"!==e.key||(e.preventDefault(),this.setState({isExpanded:!0}))}),m(this,"handleMouseLeave",()=>{this.setState({isExpanded:!1})}),this.state={isExpanded:!1}}render(){const e=this.props,t=e.className,n=e.classNamePrefix,r=e.classes,l=e.items,i=e.collapsedToggleContent,c=e.expandedToggleContent,d=e.reverseOrder,m=e.label,h=l?d?l.map(this.renderSelectorItem).reverse():l.map(this.renderSelectorItem):null,g=Object(o.g)({classes:r,classNamePrefix:n,selectClasses:this.state.isExpanded?p:u,classNames:[t,"selector",this.state.isExpanded?"expanded":"collapsed"]}),y=Object(o.g)({classes:r,selectClasses:f,classNamePrefix:n,classNames:["selector-items"]}),b=r?{toggleButtonOff:r.selectorToggle||r.selectorToggleOff,toggleButtonOn:r.selectorToggleOn}:null;return a.createElement("div",{className:g,onKeyUp:this.handleKeyUp,onKeyDown:this.handleKeyDown,onMouseLeave:this.handleMouseLeave},a.createElement(s.a,{isOn:this.state.isExpanded,className:"selector-toggle",classNamePrefix:n,classes:b,label:m,onToggle:this.handleToggle,onRef:this.onToggleRef,toggledOffContent:i,toggledOnContent:c}),a.createElement("div",{role:"listbox",className:y},h))}}m(h,"defaultProps",{useDefaultClassNaming:!0});t.a=h;h.__docgenInfo={description:"",methods:[{name:"onToggleRef",docblock:null,modifiers:[],params:[{name:"toggleElement",type:{name:"HTMLElement",nullable:!0}}],returns:null},{name:"handleToggle",docblock:null,modifiers:[],params:[{name:"isOn",type:{name:"boolean"}}],returns:null},{name:"handleItemRef",docblock:null,modifiers:[],params:[{name:"itemElement",type:{name:"HTMLElement",nullable:!0}},{name:"index",type:{name:"number"}}],returns:null},{name:"renderSelectorItem",docblock:null,modifiers:[],params:[{name:"item",type:{name:"any"}},{name:"index",type:{name:"number"}}],returns:null},{name:"handleKeyDown",docblock:null,modifiers:[],params:[{name:"keyboardEvent",type:{name:"KeyboardEvent",alias:"KeyboardEvent"}}],returns:null},{name:"handleKeyUp",docblock:null,modifiers:[],params:[{name:"keyboardEvent",type:{name:"KeyboardEvent",alias:"KeyboardEvent"}}],returns:null},{name:"handleMouseLeave",docblock:null,modifiers:[],params:[],returns:null}],displayName:"Selector",props:{useDefaultClassNaming:{defaultValue:{value:"true",computed:!1},required:!1},items:{required:!0,flowType:{name:"Array",elements:[{name:"any"}],raw:"Array<any>"},description:""},selectedItem:{required:!1,flowType:{name:"any"},description:""},reverseOrder:{required:!1,flowType:{name:"boolean"},description:""},itemClassName:{required:!1,flowType:{name:"string"},description:""},collapsedToggleContent:{required:!1,flowType:{name:"ReactNode",raw:"React.Node"},description:""},expandedToggleContent:{required:!1,flowType:{name:"ReactNode",raw:"React.Node"},description:""},label:{required:!1,flowType:{name:"string"},description:""},itemMapper:{required:!0,flowType:{name:"signature",type:"function",raw:"any => ItemData",signature:{arguments:[{name:"",type:{name:"any"}}],return:{name:"ItemData"}}},description:""},onSelect:{required:!1,flowType:{name:"signature",type:"function",raw:"any => void",signature:{arguments:[{name:"",type:{name:"any"}}],return:{name:"void"}}},description:""}}}},"./src/replay/components/generic/Selector/Selector.mdx":function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return c}));var a=n("./node_modules/react/index.js"),o=n.n(a),s=n("./node_modules/@mdx-js/tag/dist/index.js"),r=n("./node_modules/docz/dist/index.m.js"),l=n("./src/replay/components/generic/Selector/Selector.js");function i(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},s=Object.keys(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}class c extends o.a.Component{constructor(e){super(e),this.layout=null}render(){const e=this.props,t=e.components,n=i(e,["components"]);return o.a.createElement(s.MDXTag,{name:"wrapper",components:t},o.a.createElement(s.MDXTag,{name:"h1",components:t,props:{id:"selector"}},"Selector"),o.a.createElement(s.MDXTag,{name:"p",components:t},"A generic component containing a button and an expandable/collapsable list of selectable items."),o.a.createElement(s.MDXTag,{name:"h2",components:t,props:{id:"summary"}},"Summary"),o.a.createElement(s.MDXTag,{name:"p",components:t},"It operates on a list of items which can be objects or primitive values. The AudioSelector and SubtitlesSelector uses a Selector with a list of AvailableTrack. The QualitySelector makes the Selector operate on a list of numbers."),o.a.createElement(s.MDXTag,{name:"p",components:t},"When marking an item as selected, it depends on strict equality between the specified selectedItem, and one of the items in the list. This means an object, e.g. AvailableTrack, cannot be cloned or recreated."),o.a.createElement(s.MDXTag,{name:"p",components:t},"When an item is selected, the onSelect callback is invoked with the item object from the list as an argument."),o.a.createElement(s.MDXTag,{name:"p",components:t},"An item mapper must be used for making the list items presentable in the selector. This converts the item object of the specific type into an object with ID, label, and the original item as a data property."),o.a.createElement(r.Playground,{__codesandbox:"undefined",__position:0,__code:"<Selector />",__scope:{props:this?this.props:n,Selector:l.a}},o.a.createElement(l.a,null)),o.a.createElement(s.MDXTag,{name:"h2",components:t,props:{id:"props"}},"Props"),o.a.createElement(r.PropsTable,{of:l.a}))}}c.__docgenInfo={description:"",methods:[],displayName:"MDXContent"}},"./src/replay/components/generic/ToggleButton/ToggleButton.js":function(e,t,n){"use strict";var a=n("./node_modules/react/index.js"),o=n("./src/replay/components/common.js");function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const r=e=>e.toggleButtonOff||e.toggleButton,l=e=>e.toggleButtonOn||e.toggleButton;class i extends a.Component{constructor(...e){super(...e),s(this,"handleClick",()=>this.props.onToggle&&this.props.onToggle(!this.props.isOn)),s(this,"handleKeyDown",Object(o.f)(["Enter"," "])),s(this,"handleKeyUp",e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this.handleClick())})}render(){const e=this.props,t=e.isOn,n=e.label,s=e.className,i=e.classNamePrefix,c=e.toggledOnContent,d=e.toggledOffContent,m=e.onRef,u=e.classes,p=t?"toggled-on":"toggled-off",f=Object(o.g)({classes:u,selectClasses:t?l:r,classNamePrefix:i,classNames:[s,"toggle-button",p]}),h=t?c:d;return a.createElement("div",{role:"button","aria-pressed":t,title:n,onClick:this.handleClick,onKeyUp:this.handleKeyUp,onKeyDown:this.handleKeyDown,ref:m,className:f,tabIndex:0},a.createElement("div",{tabIndex:-1},h))}}s(i,"defaultProps",{useDefaultClassNaming:!0}),t.a=i,i.__docgenInfo={description:"Renders a button with two states - toggled on and off. When clicked, it reports back the opposite state.",methods:[{name:"handleClick",docblock:null,modifiers:[],params:[],returns:null},{name:"handleKeyUp",docblock:null,modifiers:[],params:[{name:"keyboardEvent",type:{name:"KeyboardEvent",alias:"KeyboardEvent"}}],returns:null}],displayName:"ToggleButton",props:{useDefaultClassNaming:{defaultValue:{value:"true",computed:!1},required:!1},isOn:{required:!1,flowType:{name:"boolean"},description:"Set to true if the button should be in the toggled on mode."},label:{required:!1,flowType:{name:"string"},description:"The label will appear in the title attribute of the root DOM element of the toggle button."},toggledOffContent:{required:!1,flowType:{name:"ReactNode",raw:"React.Node"},description:"The button content to be displayed when the button is toggled off."},toggledOnContent:{required:!1,flowType:{name:"ReactNode",raw:"React.Node"},description:"The button content to be displayed when the button is toggled on."},onToggle:{required:!1,flowType:{name:"signature",type:"function",raw:"boolean => void",signature:{arguments:[{name:"",type:{name:"boolean"}}],return:{name:"void"}}},description:"A callback method that will be invoked when the button is clicked and the value toggled. If the button has been toggled on, true is passed to the callback."},onRef:{required:!1,flowType:{name:"signature",type:"function",raw:"(?HTMLElement) => void",signature:{arguments:[{name:"",type:{name:"HTMLElement",nullable:!0}}],return:{name:"void"}}},description:"A callback method invoked with the rendered button element, for focus purposes."}}}}}]);
//# sourceMappingURL=components-generic-selector-selector.fc919b368368103c87d1.js.map