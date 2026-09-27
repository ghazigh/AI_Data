/* Datalith spot — built from video/spot/src by tools/build.mjs. Do not edit by hand. */
(()=>{var E={whip:0,pour:.5,line1:1.5,agent:4,probe:4.3,fail:4.85,stop:5.5,drop:6,pipe:8,graph:10,uses:12,beam:16,fold:18,lock:20,cta:22,end:26},Ws=[{t:12.5,name:"Claims triage copilot",domains:[2,1,4],value:"$2.1M",status:"ready"},{t:13,name:"Subrogation recovery finder",domains:[2,1],value:"$1.75M",status:"ready"},{t:13.5,name:"Fraud signal triage agent",domains:[2,0],value:"$1.45M",status:"ready"},{t:14,name:"Contract renewal agent",domains:[3,5],value:"",status:"blocked"}],Ic=[2,3,4,8,10],Pn={hub:[0,0,-4200],glyphK:32},Pi={"16x9":{W:1920,H:1080,glyph:[460,368,8.4],heroGlyphW:1180},"9x16":{W:1080,H:1920,glyph:[123,830,7],heroGlyphW:820}};var Jc=0,xo=1,Kc=2;var Rs=1,Qc=2,ji=3,ai=0,Ge=1,on=2,Tn=0,ts=1,vo=2,yo=3,Mo=4,Hr=5;var Bn=100,jc=101,tl=102,el=103,nl=104,il=200,Ei=201,sl=202,rl=203,So=204,bo=205,al=206,ol=207,cl=208,ll=209,hl=210,ul=211,dl=212,fl=213,pl=214,dr=0,fr=1,pr=2,qi=3,mr=4,gr=5,_r=6,xr=7,Eo=0,ml=1,gl=2,mn=0,To=1,wo=2,Ao=3,Co=4,Ro=5,Io=6,Po=7;var Lo=300,oi=301,Ti=302,Wr=303,Xr=304,Is=306,vr=1e3,Mn=1001,yr=1002,Te=1003,_l=1004;var Ps=1005;var we=1006,qr=1007;var ci=1008;var je=1009,Do=1010,No=1011,es=1012,Yr=1013,gn=1014,qe=1015,tn=1016,Zr=1017,$r=1018,ns=1020,Uo=35902,Fo=35899,Oo=1021,Bo=1022,ze=1023,Sn=1026,li=1027,zo=1028,Jr=1029,hi=1030,Kr=1031;var Qr=1033,Ls=33776,Ds=33777,Ns=33778,Us=33779,jr=35840,ta=35841,ea=35842,na=35843,ia=36196,sa=37492,ra=37496,aa=37488,oa=37489,Fs=37490,ca=37491,la=37808,ha=37809,ua=37810,da=37811,fa=37812,pa=37813,ma=37814,ga=37815,_a=37816,xa=37817,va=37818,ya=37819,Ma=37820,Sa=37821,ba=36492,Ea=36494,Ta=36495,wa=36283,Aa=36284,Os=36285,Ca=36286;var fs=2300,Mr=2301,hr=2302,uo=2303,fo=2400,po=2401,mo=2402;var xl=3200;var ko=0,vl=1,zn="",Je="srgb",vi="srgb-linear",ps="linear",ue="srgb";var ur=7680;var yl=519,Ml=512,Sl=513,bl=514,Ra=515,El=516,Tl=517,Ia=518,wl=519,Al=35044,Vo=35048;var wi="300 es",pn=2e3,ms=2001;function Fh(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Oh(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function gs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Cl(){let i=gs("canvas");return i.style.display="block",i}var Pc={},Yi=null;function Go(...i){let t="THREE."+i.shift();Yi?Yi("log",t,...i):console.log(t,...i)}function Rl(i){let t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Wt(...i){i=Rl(i);let t="THREE."+i.shift();if(Yi)Yi("warn",t,...i);else{let e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function qt(...i){i=Rl(i);let t="THREE."+i.shift();if(Yi)Yi("error",t,...i);else{let e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function xi(...i){let t=i.join(" ");t in Pc||(Pc[t]=!0,Wt(...i))}function Il(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var Pl={[dr]:fr,[pr]:_r,[mr]:xr,[qi]:gr,[fr]:dr,[_r]:pr,[xr]:mr,[gr]:qi},bn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},Ue=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Ha=Math.PI/180,Sr=180/Math.PI;function Bs(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ue[i&255]+Ue[i>>8&255]+Ue[i>>16&255]+Ue[i>>24&255]+"-"+Ue[t&255]+Ue[t>>8&255]+"-"+Ue[t>>16&15|64]+Ue[t>>24&255]+"-"+Ue[e&63|128]+Ue[e>>8&255]+"-"+Ue[e>>16&255]+Ue[e>>24&255]+Ue[n&255]+Ue[n>>8&255]+Ue[n>>16&255]+Ue[n>>24&255]).toLowerCase()}function re(i,t,e){return Math.max(t,Math.min(e,i))}function Bh(i,t){return(i%t+t)%t}function Wa(i,t,e){return(1-e)*i+e*t}function cs(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function He(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Yo=class Yo{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=re(this.x,t.x,e.x),this.y=re(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=re(this.x,t,e),this.y=re(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(re(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(re(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Yo.prototype.isVector2=!0;var Qt=Yo,En=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let c=n[s+0],l=n[s+1],u=n[s+2],g=n[s+3],h=r[a+0],m=r[a+1],_=r[a+2],T=r[a+3];if(g!==T||c!==h||l!==m||u!==_){let p=c*h+l*m+u*_+g*T;p<0&&(h=-h,m=-m,_=-_,T=-T,p=-p);let f=1-o;if(p<.9995){let R=Math.acos(p),P=Math.sin(R);f=Math.sin(f*R)/P,o=Math.sin(o*R)/P,c=c*f+h*o,l=l*f+m*o,u=u*f+_*o,g=g*f+T*o}else{c=c*f+h*o,l=l*f+m*o,u=u*f+_*o,g=g*f+T*o;let R=1/Math.sqrt(c*c+l*l+u*u+g*g);c*=R,l*=R,u*=R,g*=R}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=g}static multiplyQuaternionsFlat(t,e,n,s,r,a){let o=n[s],c=n[s+1],l=n[s+2],u=n[s+3],g=r[a],h=r[a+1],m=r[a+2],_=r[a+3];return t[e]=o*_+u*g+c*m-l*h,t[e+1]=c*_+u*h+l*g-o*m,t[e+2]=l*_+u*m+o*h-c*g,t[e+3]=u*_-o*g-c*h-l*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(s/2),g=o(r/2),h=c(n/2),m=c(s/2),_=c(r/2);switch(a){case"XYZ":this._x=h*u*g+l*m*_,this._y=l*m*g-h*u*_,this._z=l*u*_+h*m*g,this._w=l*u*g-h*m*_;break;case"YXZ":this._x=h*u*g+l*m*_,this._y=l*m*g-h*u*_,this._z=l*u*_-h*m*g,this._w=l*u*g+h*m*_;break;case"ZXY":this._x=h*u*g-l*m*_,this._y=l*m*g+h*u*_,this._z=l*u*_+h*m*g,this._w=l*u*g-h*m*_;break;case"ZYX":this._x=h*u*g-l*m*_,this._y=l*m*g+h*u*_,this._z=l*u*_-h*m*g,this._w=l*u*g+h*m*_;break;case"YZX":this._x=h*u*g+l*m*_,this._y=l*m*g+h*u*_,this._z=l*u*_-h*m*g,this._w=l*u*g-h*m*_;break;case"XZY":this._x=h*u*g-l*m*_,this._y=l*m*g-h*u*_,this._z=l*u*_+h*m*g,this._w=l*u*g+h*m*_;break;default:Wt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],u=e[6],g=e[10],h=n+o+g;if(h>0){let m=.5/Math.sqrt(h+1);this._w=.25/m,this._x=(u-c)*m,this._y=(r-l)*m,this._z=(a-s)*m}else if(n>o&&n>g){let m=2*Math.sqrt(1+n-o-g);this._w=(u-c)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+l)/m}else if(o>g){let m=2*Math.sqrt(1+o-n-g);this._w=(r-l)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(c+u)/m}else{let m=2*Math.sqrt(1+g-n-o);this._w=(a-s)/m,this._x=(r+l)/m,this._y=(c+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(re(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,u=e._w;return this._x=n*u+a*o+s*l-r*c,this._y=s*u+a*c+r*o-n*l,this._z=r*u+a*l+n*c-s*o,this._w=a*u-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let c=1-e;if(o<.9995){let l=Math.acos(o),u=Math.sin(l);c=Math.sin(c*l)/u,e=Math.sin(e*l)/u,this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this._onChangeCallback()}else this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Zo=class Zo{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Lc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Lc.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*s-o*n),u=2*(o*e-r*s),g=2*(r*n-a*e);return this.x=e+c*l+a*g-o*u,this.y=n+c*u+o*l-r*g,this.z=s+c*g+r*u-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=re(this.x,t.x,e.x),this.y=re(this.y,t.y,e.y),this.z=re(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=re(this.x,t,e),this.y=re(this.y,t,e),this.z=re(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(re(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Xa.copy(this).projectOnVector(t),this.sub(Xa)}reflect(t){return this.sub(Xa.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(re(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Zo.prototype.isVector3=!0;var tt=Zo,Xa=new tt,Lc=new En,$o=class $o{constructor(t,e,n,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l)}set(t,e,n,s,r,a,o,c,l){let u=this.elements;return u[0]=t,u[1]=s,u[2]=o,u[3]=e,u[4]=r,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],g=n[7],h=n[2],m=n[5],_=n[8],T=s[0],p=s[3],f=s[6],R=s[1],P=s[4],S=s[7],A=s[2],w=s[5],L=s[8];return r[0]=a*T+o*R+c*A,r[3]=a*p+o*P+c*w,r[6]=a*f+o*S+c*L,r[1]=l*T+u*R+g*A,r[4]=l*p+u*P+g*w,r[7]=l*f+u*S+g*L,r[2]=h*T+m*R+_*A,r[5]=h*p+m*P+_*w,r[8]=h*f+m*S+_*L,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8];return e*a*u-e*o*l-n*r*u+n*o*c+s*r*l-s*a*c}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8],g=u*a-o*l,h=o*c-u*r,m=l*r-a*c,_=e*g+n*h+s*m;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);let T=1/_;return t[0]=g*T,t[1]=(s*l-u*n)*T,t[2]=(o*n-s*a)*T,t[3]=h*T,t[4]=(u*e-s*c)*T,t[5]=(s*r-o*e)*T,t[6]=m*T,t[7]=(n*c-l*e)*T,t[8]=(a*e-n*r)*T,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-s*l,s*c,-s*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return xi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(qa.makeScale(t,e)),this}rotate(t){return xi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(qa.makeRotation(-t)),this}translate(t,e){return xi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(qa.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};$o.prototype.isMatrix3=!0;var Zt=$o,qa=new Zt,Dc=new Zt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Nc=new Zt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function zh(){let i={enabled:!0,workingColorSpace:vi,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ue&&(s.r=On(s.r),s.g=On(s.g),s.b=On(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ue&&(s.r=Xi(s.r),s.g=Xi(s.g),s.b=Xi(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===zn?ps:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return xi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return xi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[vi]:{primaries:t,whitePoint:n,transfer:ps,toXYZ:Dc,fromXYZ:Nc,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Je},outputColorSpaceConfig:{drawingBufferColorSpace:Je}},[Je]:{primaries:t,whitePoint:n,transfer:ue,toXYZ:Dc,fromXYZ:Nc,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Je}}}),i}var ee=zh();function On(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Xi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Li,br=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Li===void 0&&(Li=gs("canvas")),Li.width=t.width,Li.height=t.height;let s=Li.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Li}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=gs("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=On(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(On(e[n]/255)*255):e[n]=On(e[n]);return{data:e,width:t.width,height:t.height}}else return Wt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},kh=0,Zi=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:kh++}),this.uuid=Bs(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Ya(s[a].image)):r.push(Ya(s[a]))}else r=Ya(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function Ya(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?br.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Wt("Texture: Unable to serialize Texture."),{})}var Vh=0,Za=new tt,We=class i extends bn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=Mn,s=Mn,r=we,a=ci,o=ze,c=je,l=i.DEFAULT_ANISOTROPY,u=zn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Vh++}),this.uuid=Bs(),this.name="",this.source=new Zi(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Qt(0,0),this.repeat=new Qt(1,1),this.center=new Qt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Zt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Za).x}get height(){return this.source.getSize(Za).y}get depth(){return this.source.getSize(Za).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){Wt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Wt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Lo)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case vr:t.x=t.x-Math.floor(t.x);break;case Mn:t.x=t.x<0?0:1;break;case yr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case vr:t.y=t.y-Math.floor(t.y);break;case Mn:t.y=t.y<0?0:1;break;case yr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};We.DEFAULT_IMAGE=null;We.DEFAULT_MAPPING=Lo;We.DEFAULT_ANISOTROPY=1;var Jo=class Jo{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,c=t.elements,l=c[0],u=c[4],g=c[8],h=c[1],m=c[5],_=c[9],T=c[2],p=c[6],f=c[10];if(Math.abs(u-h)<.01&&Math.abs(g-T)<.01&&Math.abs(_-p)<.01){if(Math.abs(u+h)<.1&&Math.abs(g+T)<.1&&Math.abs(_+p)<.1&&Math.abs(l+m+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let P=(l+1)/2,S=(m+1)/2,A=(f+1)/2,w=(u+h)/4,L=(g+T)/4,x=(_+p)/4;return P>S&&P>A?P<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(P),s=w/n,r=L/n):S>A?S<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),n=w/s,r=x/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=L/r,s=x/r),this.set(n,s,r,e),this}let R=Math.sqrt((p-_)*(p-_)+(g-T)*(g-T)+(h-u)*(h-u));return Math.abs(R)<.001&&(R=1),this.x=(p-_)/R,this.y=(g-T)/R,this.z=(h-u)/R,this.w=Math.acos((l+m+f-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=re(this.x,t.x,e.x),this.y=re(this.y,t.y,e.y),this.z=re(this.z,t.z,e.z),this.w=re(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=re(this.x,t,e),this.y=re(this.y,t,e),this.z=re(this.z,t,e),this.w=re(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(re(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Jo.prototype.isVector4=!0;var xe=Jo,Er=class extends bn{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:we,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new xe(0,0,t,e),this.scissorTest=!1,this.viewport=new xe(0,0,t,e),this.textures=[];let s={width:t,height:e,depth:n.depth},r=new We(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:we,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new Zi(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ae=class extends Er{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},_s=class extends We{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Te,this.minFilter=Te,this.wrapR=Mn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Tr=class extends We{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Te,this.minFilter=Te,this.wrapR=Mn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var Gr=class Gr{constructor(t,e,n,s,r,a,o,c,l,u,g,h,m,_,T,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l,u,g,h,m,_,T,p)}set(t,e,n,s,r,a,o,c,l,u,g,h,m,_,T,p){let f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=c,f[2]=l,f[6]=u,f[10]=g,f[14]=h,f[3]=m,f[7]=_,f[11]=T,f[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Gr().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,s=1/Di.setFromMatrixColumn(t,0).length(),r=1/Di.setFromMatrixColumn(t,1).length(),a=1/Di.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),g=Math.sin(r);if(t.order==="XYZ"){let h=a*u,m=a*g,_=o*u,T=o*g;e[0]=c*u,e[4]=-c*g,e[8]=l,e[1]=m+_*l,e[5]=h-T*l,e[9]=-o*c,e[2]=T-h*l,e[6]=_+m*l,e[10]=a*c}else if(t.order==="YXZ"){let h=c*u,m=c*g,_=l*u,T=l*g;e[0]=h+T*o,e[4]=_*o-m,e[8]=a*l,e[1]=a*g,e[5]=a*u,e[9]=-o,e[2]=m*o-_,e[6]=T+h*o,e[10]=a*c}else if(t.order==="ZXY"){let h=c*u,m=c*g,_=l*u,T=l*g;e[0]=h-T*o,e[4]=-a*g,e[8]=_+m*o,e[1]=m+_*o,e[5]=a*u,e[9]=T-h*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){let h=a*u,m=a*g,_=o*u,T=o*g;e[0]=c*u,e[4]=_*l-m,e[8]=h*l+T,e[1]=c*g,e[5]=T*l+h,e[9]=m*l-_,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){let h=a*c,m=a*l,_=o*c,T=o*l;e[0]=c*u,e[4]=T-h*g,e[8]=_*g+m,e[1]=g,e[5]=a*u,e[9]=-o*u,e[2]=-l*u,e[6]=m*g+_,e[10]=h-T*g}else if(t.order==="XZY"){let h=a*c,m=a*l,_=o*c,T=o*l;e[0]=c*u,e[4]=-g,e[8]=l*u,e[1]=h*g+T,e[5]=a*u,e[9]=m*g-_,e[2]=_*g-m,e[6]=o*u,e[10]=T*g+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Gh,t,Hh)}lookAt(t,e,n){let s=this.elements;return Ze.subVectors(t,e),Ze.lengthSq()===0&&(Ze.z=1),Ze.normalize(),Yn.crossVectors(n,Ze),Yn.lengthSq()===0&&(Math.abs(n.z)===1?Ze.x+=1e-4:Ze.z+=1e-4,Ze.normalize(),Yn.crossVectors(n,Ze)),Yn.normalize(),Xs.crossVectors(Ze,Yn),s[0]=Yn.x,s[4]=Xs.x,s[8]=Ze.x,s[1]=Yn.y,s[5]=Xs.y,s[9]=Ze.y,s[2]=Yn.z,s[6]=Xs.z,s[10]=Ze.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],g=n[5],h=n[9],m=n[13],_=n[2],T=n[6],p=n[10],f=n[14],R=n[3],P=n[7],S=n[11],A=n[15],w=s[0],L=s[4],x=s[8],C=s[12],F=s[1],q=s[5],O=s[9],Z=s[13],D=s[2],H=s[6],et=s[10],k=s[14],ct=s[3],ot=s[7],j=s[11],rt=s[15];return r[0]=a*w+o*F+c*D+l*ct,r[4]=a*L+o*q+c*H+l*ot,r[8]=a*x+o*O+c*et+l*j,r[12]=a*C+o*Z+c*k+l*rt,r[1]=u*w+g*F+h*D+m*ct,r[5]=u*L+g*q+h*H+m*ot,r[9]=u*x+g*O+h*et+m*j,r[13]=u*C+g*Z+h*k+m*rt,r[2]=_*w+T*F+p*D+f*ct,r[6]=_*L+T*q+p*H+f*ot,r[10]=_*x+T*O+p*et+f*j,r[14]=_*C+T*Z+p*k+f*rt,r[3]=R*w+P*F+S*D+A*ct,r[7]=R*L+P*q+S*H+A*ot,r[11]=R*x+P*O+S*et+A*j,r[15]=R*C+P*Z+S*k+A*rt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],u=t[2],g=t[6],h=t[10],m=t[14],_=t[3],T=t[7],p=t[11],f=t[15],R=c*m-l*h,P=o*m-l*g,S=o*h-c*g,A=a*m-l*u,w=a*h-c*u,L=a*g-o*u;return e*(T*R-p*P+f*S)-n*(_*R-p*A+f*w)+s*(_*P-T*A+f*L)-r*(_*S-T*w+p*L)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],a=t[5],o=t[9],c=t[2],l=t[6],u=t[10];return e*(a*u-o*l)-n*(r*u-o*c)+s*(r*l-a*c)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8],g=t[9],h=t[10],m=t[11],_=t[12],T=t[13],p=t[14],f=t[15],R=e*o-n*a,P=e*c-s*a,S=e*l-r*a,A=n*c-s*o,w=n*l-r*o,L=s*l-r*c,x=u*T-g*_,C=u*p-h*_,F=u*f-m*_,q=g*p-h*T,O=g*f-m*T,Z=h*f-m*p,D=R*Z-P*O+S*q+A*F-w*C+L*x;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let H=1/D;return t[0]=(o*Z-c*O+l*q)*H,t[1]=(s*O-n*Z-r*q)*H,t[2]=(T*L-p*w+f*A)*H,t[3]=(h*w-g*L-m*A)*H,t[4]=(c*F-a*Z-l*C)*H,t[5]=(e*Z-s*F+r*C)*H,t[6]=(p*S-_*L-f*P)*H,t[7]=(u*L-h*S+m*P)*H,t[8]=(a*O-o*F+l*x)*H,t[9]=(n*F-e*O-r*x)*H,t[10]=(_*w-T*S+f*R)*H,t[11]=(g*S-u*w-m*R)*H,t[12]=(o*C-a*q-c*x)*H,t[13]=(e*q-n*C+s*x)*H,t[14]=(T*P-_*A-p*R)*H,t[15]=(u*A-g*P+h*R)*H,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,c=t.z,l=r*a,u=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,u*o+n,u*c-s*a,0,l*c-s*o,u*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,u=a+a,g=o+o,h=r*l,m=r*u,_=r*g,T=a*u,p=a*g,f=o*g,R=c*l,P=c*u,S=c*g,A=n.x,w=n.y,L=n.z;return s[0]=(1-(T+f))*A,s[1]=(m+S)*A,s[2]=(_-P)*A,s[3]=0,s[4]=(m-S)*w,s[5]=(1-(h+f))*w,s[6]=(p+R)*w,s[7]=0,s[8]=(_+P)*L,s[9]=(p-R)*L,s[10]=(1-(h+T))*L,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=Di.set(s[0],s[1],s[2]).length(),o=Di.set(s[4],s[5],s[6]).length(),c=Di.set(s[8],s[9],s[10]).length();r<0&&(a=-a),hn.copy(this);let l=1/a,u=1/o,g=1/c;return hn.elements[0]*=l,hn.elements[1]*=l,hn.elements[2]*=l,hn.elements[4]*=u,hn.elements[5]*=u,hn.elements[6]*=u,hn.elements[8]*=g,hn.elements[9]*=g,hn.elements[10]*=g,e.setFromRotationMatrix(hn),n.x=a,n.y=o,n.z=c,this}makePerspective(t,e,n,s,r,a,o=pn,c=!1){let l=this.elements,u=2*r/(e-t),g=2*r/(n-s),h=(e+t)/(e-t),m=(n+s)/(n-s),_,T;if(c)_=r/(a-r),T=a*r/(a-r);else if(o===pn)_=-(a+r)/(a-r),T=-2*a*r/(a-r);else if(o===ms)_=-a/(a-r),T=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=g,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=_,l[14]=T,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=pn,c=!1){let l=this.elements,u=2/(e-t),g=2/(n-s),h=-(e+t)/(e-t),m=-(n+s)/(n-s),_,T;if(c)_=1/(a-r),T=a/(a-r);else if(o===pn)_=-2/(a-r),T=-(a+r)/(a-r);else if(o===ms)_=-1/(a-r),T=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=g,l[9]=0,l[13]=m,l[2]=0,l[6]=0,l[10]=_,l[14]=T,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};Gr.prototype.isMatrix4=!0;var Me=Gr,Di=new tt,hn=new Me,Gh=new tt(0,0,0),Hh=new tt(1,1,1),Yn=new tt,Xs=new tt,Ze=new tt,Uc=new Me,Fc=new En,jn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],u=s[9],g=s[2],h=s[6],m=s[10];switch(e){case"XYZ":this._y=Math.asin(re(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-re(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-g,r),this._z=0);break;case"ZXY":this._x=Math.asin(re(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-g,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-re(g,-1,1)),Math.abs(g)<.9999999?(this._x=Math.atan2(h,m),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(re(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-g,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-re(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,m),this._y=0);break;default:Wt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Uc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Uc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Fc.setFromEuler(this),this.setFromQuaternion(Fc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};jn.DEFAULT_ORDER="XYZ";var xs=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Wh=0,Oc=new tt,Ni=new En,Ln=new Me,qs=new tt,ls=new tt,Xh=new tt,qh=new En,Bc=new tt(1,0,0),zc=new tt(0,1,0),kc=new tt(0,0,1),Vc={type:"added"},Yh={type:"removed"},Ui={type:"childadded",child:null},$a={type:"childremoved",child:null},an=class i extends bn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Wh++}),this.uuid=Bs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new tt,e=new jn,n=new En,s=new tt(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Me},normalMatrix:{value:new Zt}}),this.matrix=new Me,this.matrixWorld=new Me,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new xs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ni.setFromAxisAngle(t,e),this.quaternion.multiply(Ni),this}rotateOnWorldAxis(t,e){return Ni.setFromAxisAngle(t,e),this.quaternion.premultiply(Ni),this}rotateX(t){return this.rotateOnAxis(Bc,t)}rotateY(t){return this.rotateOnAxis(zc,t)}rotateZ(t){return this.rotateOnAxis(kc,t)}translateOnAxis(t,e){return Oc.copy(t).applyQuaternion(this.quaternion),this.position.add(Oc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Bc,t)}translateY(t){return this.translateOnAxis(zc,t)}translateZ(t){return this.translateOnAxis(kc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ln.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?qs.copy(t):qs.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),ls.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ln.lookAt(ls,qs,this.up):Ln.lookAt(qs,ls,this.up),this.quaternion.setFromRotationMatrix(Ln),s&&(Ln.extractRotation(s.matrixWorld),Ni.setFromRotationMatrix(Ln),this.quaternion.premultiply(Ni.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(qt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Vc),Ui.child=t,this.dispatchEvent(Ui),Ui.child=null):qt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Yh),$a.child=t,this.dispatchEvent($a),$a.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ln.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ln.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ln),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Vc),Ui.child=t,this.dispatchEvent(Ui),Ui.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ls,t,Xh),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ls,qh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let g=c[l];r(t.shapes,g)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];s.animations.push(r(t.animations,c))}}if(e){let o=a(t.geometries),c=a(t.materials),l=a(t.textures),u=a(t.images),g=a(t.shapes),h=a(t.skeletons),m=a(t.animations),_=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),g.length>0&&(n.shapes=g),h.length>0&&(n.skeletons=h),m.length>0&&(n.animations=m),_.length>0&&(n.nodes=_)}return n.object=s,n;function a(o){let c=[];for(let l in o){let u=o[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};an.DEFAULT_UP=new tt(0,1,0);an.DEFAULT_MATRIX_AUTO_UPDATE=!0;an.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var _i=class extends an{constructor(){super(),this.isGroup=!0,this.type="Group"}},Zh={type:"move"},$i=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _i,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _i,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new tt,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new tt),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _i,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new tt,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new tt,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(let T of t.hand.values()){let p=e.getJointPose(T,n),f=this._getHandJoint(l,T);p!==null&&(f.matrix.fromArray(p.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=p.radius),f.visible=p!==null}let u=l.joints["index-finger-tip"],g=l.joints["thumb-tip"],h=u.position.distanceTo(g.position),m=.02,_=.005;l.inputState.pinching&&h>m+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&h<=m-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Zh)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new _i;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Ll={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Zn={h:0,s:0,l:0},Ys={h:0,s:0,l:0};function Ja(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var oe=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Je){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ee.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=ee.workingColorSpace){return this.r=t,this.g=e,this.b=n,ee.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=ee.workingColorSpace){if(t=Bh(t,1),e=re(e,0,1),n=re(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Ja(a,r,t+1/3),this.g=Ja(a,r,t),this.b=Ja(a,r,t-1/3)}return ee.colorSpaceToWorking(this,s),this}setStyle(t,e=Je){function n(r){r!==void 0&&parseFloat(r)<1&&Wt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Wt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Wt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Je){let n=Ll[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Wt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=On(t.r),this.g=On(t.g),this.b=On(t.b),this}copyLinearToSRGB(t){return this.r=Xi(t.r),this.g=Xi(t.g),this.b=Xi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Je){return ee.workingToColorSpace(Fe.copy(this),t),Math.round(re(Fe.r*255,0,255))*65536+Math.round(re(Fe.g*255,0,255))*256+Math.round(re(Fe.b*255,0,255))}getHexString(t=Je){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ee.workingColorSpace){ee.workingToColorSpace(Fe.copy(this),e);let n=Fe.r,s=Fe.g,r=Fe.b,a=Math.max(n,s,r),o=Math.min(n,s,r),c,l,u=(o+a)/2;if(o===a)c=0,l=0;else{let g=a-o;switch(l=u<=.5?g/(a+o):g/(2-a-o),a){case n:c=(s-r)/g+(s<r?6:0);break;case s:c=(r-n)/g+2;break;case r:c=(n-s)/g+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=ee.workingColorSpace){return ee.workingToColorSpace(Fe.copy(this),e),t.r=Fe.r,t.g=Fe.g,t.b=Fe.b,t}getStyle(t=Je){ee.workingToColorSpace(Fe.copy(this),t);let e=Fe.r,n=Fe.g,s=Fe.b;return t!==Je?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Zn),this.setHSL(Zn.h+t,Zn.s+e,Zn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Zn),t.getHSL(Ys);let n=Wa(Zn.h,Ys.h,e),s=Wa(Zn.s,Ys.s,e),r=Wa(Zn.l,Ys.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Fe=new oe;oe.NAMES=Ll;var Ji=class extends an{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new jn,this.environmentIntensity=1,this.environmentRotation=new jn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},un=new tt,Dn=new tt,Ka=new tt,Nn=new tt,Fi=new tt,Oi=new tt,Gc=new tt,Qa=new tt,ja=new tt,to=new tt,eo=new xe,no=new xe,io=new xe,Qn=class i{constructor(t=new tt,e=new tt,n=new tt){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),un.subVectors(t,e),s.cross(un);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){un.subVectors(s,e),Dn.subVectors(n,e),Ka.subVectors(t,e);let a=un.dot(un),o=un.dot(Dn),c=un.dot(Ka),l=Dn.dot(Dn),u=Dn.dot(Ka),g=a*l-o*o;if(g===0)return r.set(0,0,0),null;let h=1/g,m=(l*c-o*u)*h,_=(a*u-o*c)*h;return r.set(1-m-_,_,m)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Nn)===null?!1:Nn.x>=0&&Nn.y>=0&&Nn.x+Nn.y<=1}static getInterpolation(t,e,n,s,r,a,o,c){return this.getBarycoord(t,e,n,s,Nn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Nn.x),c.addScaledVector(a,Nn.y),c.addScaledVector(o,Nn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,a){return eo.setScalar(0),no.setScalar(0),io.setScalar(0),eo.fromBufferAttribute(t,e),no.fromBufferAttribute(t,n),io.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(eo,r.x),a.addScaledVector(no,r.y),a.addScaledVector(io,r.z),a}static isFrontFacing(t,e,n,s){return un.subVectors(n,e),Dn.subVectors(t,e),un.cross(Dn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return un.subVectors(this.c,this.b),Dn.subVectors(this.a,this.b),un.cross(Dn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,a,o;Fi.subVectors(s,n),Oi.subVectors(r,n),Qa.subVectors(t,n);let c=Fi.dot(Qa),l=Oi.dot(Qa);if(c<=0&&l<=0)return e.copy(n);ja.subVectors(t,s);let u=Fi.dot(ja),g=Oi.dot(ja);if(u>=0&&g<=u)return e.copy(s);let h=c*g-u*l;if(h<=0&&c>=0&&u<=0)return a=c/(c-u),e.copy(n).addScaledVector(Fi,a);to.subVectors(t,r);let m=Fi.dot(to),_=Oi.dot(to);if(_>=0&&m<=_)return e.copy(r);let T=m*l-c*_;if(T<=0&&l>=0&&_<=0)return o=l/(l-_),e.copy(n).addScaledVector(Oi,o);let p=u*_-m*g;if(p<=0&&g-u>=0&&m-_>=0)return Gc.subVectors(r,s),o=(g-u)/(g-u+(m-_)),e.copy(s).addScaledVector(Gc,o);let f=1/(p+T+h);return a=T*f,o=h*f,e.copy(n).addScaledVector(Fi,a).addScaledVector(Oi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},ti=class{constructor(t=new tt(1/0,1/0,1/0),e=new tt(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(dn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(dn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=dn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,dn):dn.fromBufferAttribute(r,a),dn.applyMatrix4(t.matrixWorld),this.expandByPoint(dn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Zs.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Zs.copy(n.boundingBox)),Zs.applyMatrix4(t.matrixWorld),this.union(Zs)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,dn),dn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(hs),$s.subVectors(this.max,hs),Bi.subVectors(t.a,hs),zi.subVectors(t.b,hs),ki.subVectors(t.c,hs),$n.subVectors(zi,Bi),Jn.subVectors(ki,zi),fi.subVectors(Bi,ki);let e=[0,-$n.z,$n.y,0,-Jn.z,Jn.y,0,-fi.z,fi.y,$n.z,0,-$n.x,Jn.z,0,-Jn.x,fi.z,0,-fi.x,-$n.y,$n.x,0,-Jn.y,Jn.x,0,-fi.y,fi.x,0];return!so(e,Bi,zi,ki,$s)||(e=[1,0,0,0,1,0,0,0,1],!so(e,Bi,zi,ki,$s))?!1:(Js.crossVectors($n,Jn),e=[Js.x,Js.y,Js.z],so(e,Bi,zi,ki,$s))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,dn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(dn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Un[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Un[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Un[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Un[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Un[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Un[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Un[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Un[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Un),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Un=[new tt,new tt,new tt,new tt,new tt,new tt,new tt,new tt],dn=new tt,Zs=new ti,Bi=new tt,zi=new tt,ki=new tt,$n=new tt,Jn=new tt,fi=new tt,hs=new tt,$s=new tt,Js=new tt,pi=new tt;function so(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){pi.fromArray(i,r);let o=s.x*Math.abs(pi.x)+s.y*Math.abs(pi.y)+s.z*Math.abs(pi.z),c=t.dot(pi),l=e.dot(pi),u=n.dot(pi);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}var Ee=new tt,Ks=new Qt,$h=0,Pe=class extends bn{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:$h++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Al,this.updateRanges=[],this.gpuType=qe,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ks.fromBufferAttribute(this,e),Ks.applyMatrix3(t),this.setXY(e,Ks.x,Ks.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix3(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix4(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyNormalMatrix(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.transformDirection(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=cs(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=He(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=cs(e,this.array)),e}setX(t,e){return this.normalized&&(e=He(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=cs(e,this.array)),e}setY(t,e){return this.normalized&&(e=He(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=cs(e,this.array)),e}setZ(t,e){return this.normalized&&(e=He(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=cs(e,this.array)),e}setW(t,e){return this.normalized&&(e=He(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=He(e,this.array),n=He(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=He(e,this.array),n=He(n,this.array),s=He(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=He(e,this.array),n=He(n,this.array),s=He(s,this.array),r=He(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var vs=class extends Pe{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var ys=class extends Pe{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var rn=class extends Pe{constructor(t,e,n){super(new Float32Array(t),e,n)}},Jh=new ti,us=new tt,ro=new tt,Ki=class{constructor(t=new tt,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Jh.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;us.subVectors(t,this.center);let e=us.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(us,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ro.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(us.copy(t.center).add(ro)),this.expandByPoint(us.copy(t.center).sub(ro))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Kh=0,sn=new Me,ao=new an,Vi=new tt,$e=new ti,ds=new ti,Ie=new tt,Xe=class i extends bn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Kh++}),this.uuid=Bs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Fh(t)?ys:vs)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Zt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return sn.makeRotationFromQuaternion(t),this.applyMatrix4(sn),this}rotateX(t){return sn.makeRotationX(t),this.applyMatrix4(sn),this}rotateY(t){return sn.makeRotationY(t),this.applyMatrix4(sn),this}rotateZ(t){return sn.makeRotationZ(t),this.applyMatrix4(sn),this}translate(t,e,n){return sn.makeTranslation(t,e,n),this.applyMatrix4(sn),this}scale(t,e,n){return sn.makeScale(t,e,n),this.applyMatrix4(sn),this}lookAt(t){return ao.lookAt(t),ao.updateMatrix(),this.applyMatrix4(ao.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Vi).negate(),this.translate(Vi.x,Vi.y,Vi.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new rn(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Wt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ti);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){qt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new tt(-1/0,-1/0,-1/0),new tt(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];$e.setFromBufferAttribute(r),this.morphTargetsRelative?(Ie.addVectors(this.boundingBox.min,$e.min),this.boundingBox.expandByPoint(Ie),Ie.addVectors(this.boundingBox.max,$e.max),this.boundingBox.expandByPoint(Ie)):(this.boundingBox.expandByPoint($e.min),this.boundingBox.expandByPoint($e.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&qt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ki);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){qt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new tt,1/0);return}if(t){let n=this.boundingSphere.center;if($e.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];ds.setFromBufferAttribute(o),this.morphTargetsRelative?(Ie.addVectors($e.min,ds.min),$e.expandByPoint(Ie),Ie.addVectors($e.max,ds.max),$e.expandByPoint(Ie)):($e.expandByPoint(ds.min),$e.expandByPoint(ds.max))}$e.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Ie.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ie));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)Ie.fromBufferAttribute(o,l),c&&(Vi.fromBufferAttribute(t,l),Ie.add(Vi)),s=Math.max(s,n.distanceToSquared(Ie))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&qt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){qt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Pe(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],c=[];for(let x=0;x<n.count;x++)o[x]=new tt,c[x]=new tt;let l=new tt,u=new tt,g=new tt,h=new Qt,m=new Qt,_=new Qt,T=new tt,p=new tt;function f(x,C,F){l.fromBufferAttribute(n,x),u.fromBufferAttribute(n,C),g.fromBufferAttribute(n,F),h.fromBufferAttribute(r,x),m.fromBufferAttribute(r,C),_.fromBufferAttribute(r,F),u.sub(l),g.sub(l),m.sub(h),_.sub(h);let q=1/(m.x*_.y-_.x*m.y);isFinite(q)&&(T.copy(u).multiplyScalar(_.y).addScaledVector(g,-m.y).multiplyScalar(q),p.copy(g).multiplyScalar(m.x).addScaledVector(u,-_.x).multiplyScalar(q),o[x].add(T),o[C].add(T),o[F].add(T),c[x].add(p),c[C].add(p),c[F].add(p))}let R=this.groups;R.length===0&&(R=[{start:0,count:t.count}]);for(let x=0,C=R.length;x<C;++x){let F=R[x],q=F.start,O=F.count;for(let Z=q,D=q+O;Z<D;Z+=3)f(t.getX(Z+0),t.getX(Z+1),t.getX(Z+2))}let P=new tt,S=new tt,A=new tt,w=new tt;function L(x){A.fromBufferAttribute(s,x),w.copy(A);let C=o[x];P.copy(C),P.sub(A.multiplyScalar(A.dot(C))).normalize(),S.crossVectors(w,C);let q=S.dot(c[x])<0?-1:1;a.setXYZW(x,P.x,P.y,P.z,q)}for(let x=0,C=R.length;x<C;++x){let F=R[x],q=F.start,O=F.count;for(let Z=q,D=q+O;Z<D;Z+=3)L(t.getX(Z+0)),L(t.getX(Z+1)),L(t.getX(Z+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new Pe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let h=0,m=n.count;h<m;h++)n.setXYZ(h,0,0,0);let s=new tt,r=new tt,a=new tt,o=new tt,c=new tt,l=new tt,u=new tt,g=new tt;if(t)for(let h=0,m=t.count;h<m;h+=3){let _=t.getX(h+0),T=t.getX(h+1),p=t.getX(h+2);s.fromBufferAttribute(e,_),r.fromBufferAttribute(e,T),a.fromBufferAttribute(e,p),u.subVectors(a,r),g.subVectors(s,r),u.cross(g),o.fromBufferAttribute(n,_),c.fromBufferAttribute(n,T),l.fromBufferAttribute(n,p),o.add(u),c.add(u),l.add(u),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(T,c.x,c.y,c.z),n.setXYZ(p,l.x,l.y,l.z)}else for(let h=0,m=e.count;h<m;h+=3)s.fromBufferAttribute(e,h+0),r.fromBufferAttribute(e,h+1),a.fromBufferAttribute(e,h+2),u.subVectors(a,r),g.subVectors(s,r),u.cross(g),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ie.fromBufferAttribute(t,e),Ie.normalize(),t.setXYZ(e,Ie.x,Ie.y,Ie.z)}toNonIndexed(){function t(o,c){let l=o.array,u=o.itemSize,g=o.normalized,h=new l.constructor(c.length*u),m=0,_=0;for(let T=0,p=c.length;T<p;T++){o.isInterleavedBufferAttribute?m=c[T]*o.data.stride+o.offset:m=c[T]*u;for(let f=0;f<u;f++)h[_++]=l[m++]}return new Pe(h,u,g)}if(this.index===null)return Wt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let o in s){let c=s[o],l=t(c,n);e.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let u=0,g=l.length;u<g;u++){let h=l[u],m=t(h,n);c.push(m)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let g=0,h=l.length;g<h;g++){let m=l[g];u.push(m.toJSON(t.data))}u.length>0&&(s[c]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let l in s){let u=s[l];this.setAttribute(l,u.clone(e))}let r=t.morphAttributes;for(let l in r){let u=[],g=r[l];for(let h=0,m=g.length;h<m;h++)u.push(g[h].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let l=0,u=a.length;l<u;l++){let g=a[l];this.addGroup(g.start,g.count,g.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var oo=new tt,Qh=new tt,jh=new Zt,fn=class{constructor(t=new tt(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=oo.subVectors(n,e).cross(Qh.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let s=t.delta(oo),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||jh.getNormalMatrix(t),s=this.coplanarPoint(oo).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},tu=0,yi=class extends bn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:tu++}),this.uuid=Bs(),this.name="",this.type="Material",this.blending=ts,this.side=ai,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=So,this.blendDst=bo,this.blendEquation=Bn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new oe(0,0,0),this.blendAlpha=0,this.depthFunc=qi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=yl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ur,this.stencilZFail=ur,this.stencilZPass=ur,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){Wt(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Wt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new oe().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new fn().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Qt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Qt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var Fn=new tt,co=new tt,Qs=new tt,js=new tt,wr=class{constructor(t=new tt,e=new tt(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Fn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Fn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Fn.copy(this.origin).addScaledVector(this.direction,e),Fn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){co.copy(t).add(e).multiplyScalar(.5),Qs.copy(e).sub(t).normalize(),js.copy(this.origin).sub(co);let r=t.distanceTo(e)*.5,a=-this.direction.dot(Qs),o=js.dot(this.direction),c=-js.dot(Qs),l=js.lengthSq(),u=Math.abs(1-a*a),g,h,m,_;if(u>0)if(g=a*c-o,h=a*o-c,_=r*u,g>=0)if(h>=-_)if(h<=_){let T=1/u;g*=T,h*=T,m=g*(g+a*h+2*o)+h*(a*g+h+2*c)+l}else h=r,g=Math.max(0,-(a*h+o)),m=-g*g+h*(h+2*c)+l;else h=-r,g=Math.max(0,-(a*h+o)),m=-g*g+h*(h+2*c)+l;else h<=-_?(g=Math.max(0,-(-a*r+o)),h=g>0?-r:Math.min(Math.max(-r,-c),r),m=-g*g+h*(h+2*c)+l):h<=_?(g=0,h=Math.min(Math.max(-r,-c),r),m=h*(h+2*c)+l):(g=Math.max(0,-(a*r+o)),h=g>0?r:Math.min(Math.max(-r,-c),r),m=-g*g+h*(h+2*c)+l);else h=a>0?-r:r,g=Math.max(0,-(a*h+o)),m=-g*g+h*(h+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,g),s&&s.copy(co).addScaledVector(Qs,h),m}intersectSphere(t,e){if(t.radius<0)return null;Fn.subVectors(t.center,this.origin);let n=Fn.dot(this.direction),s=Fn.dot(Fn)-n*n,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,c,l=1/this.direction.x,u=1/this.direction.y,g=1/this.direction.z,h=this.origin;return l>=0?(n=(t.min.x-h.x)*l,s=(t.max.x-h.x)*l):(n=(t.max.x-h.x)*l,s=(t.min.x-h.x)*l),u>=0?(r=(t.min.y-h.y)*u,a=(t.max.y-h.y)*u):(r=(t.max.y-h.y)*u,a=(t.min.y-h.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),g>=0?(o=(t.min.z-h.z)*g,c=(t.max.z-h.z)*g):(o=(t.max.z-h.z)*g,c=(t.min.z-h.z)*g),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Fn)!==null}intersectTriangle(t,e,n,s,r){let a=this.origin,o=this.direction,c=o.x,l=o.y,u=o.z,g=t.x-a.x,h=t.y-a.y,m=t.z-a.z,_=e.x-a.x,T=e.y-a.y,p=e.z-a.z,f=n.x-a.x,R=n.y-a.y,P=n.z-a.z,S=Math.abs(c),A=Math.abs(l),w=Math.abs(u),L,x,C,F,q,O,Z,D,H,et,k,ct;if(S>=A&&S>=w?(C=c,O=g,H=_,ct=f,c>=0?(L=l,x=u,F=h,q=m,Z=T,D=p,et=R,k=P):(L=u,x=l,F=m,q=h,Z=p,D=T,et=P,k=R)):A>=w?(C=l,O=h,H=T,ct=R,l>=0?(L=u,x=c,F=m,q=g,Z=p,D=_,et=P,k=f):(L=c,x=u,F=g,q=m,Z=_,D=p,et=f,k=P)):(C=u,O=m,H=p,ct=P,u>=0?(L=c,x=l,F=g,q=h,Z=_,D=T,et=f,k=R):(L=l,x=c,F=h,q=g,Z=T,D=_,et=R,k=f)),C===0)return null;let ot=L/C,j=x/C,rt=1/C,It=F-ot*O,Pt=q-j*O,ie=Z-ot*H,Vt=D-j*H,Jt=et-ot*ct,it=k-j*ct,ht=Jt*Vt-it*ie,At=It*it-Pt*Jt,Gt=ie*Pt-Vt*It;if(s){if(ht<0||At<0||Gt<0)return null}else if((ht<0||At<0||Gt<0)&&(ht>0||At>0||Gt>0))return null;let Et=ht+At+Gt;if(Et===0)return null;let Xt=rt*(ht*O+At*H+Gt*ct);return(Et>0?Xt<0:Xt>0)?null:this.at(Xt/Et,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ms=class extends yi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new oe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new jn,this.combine=Eo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Hc=new Me,mi=new wr,tr=new Ki,Wc=new tt,er=new tt,nr=new tt,ir=new tt,lo=new tt,sr=new tt,Xc=new tt,rr=new tt,Be=class extends an{constructor(t=new Xe,e=new Ms){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){sr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let u=o[c],g=r[c];u!==0&&(lo.fromBufferAttribute(g,t),a?sr.addScaledVector(lo,u):sr.addScaledVector(lo.sub(e),u))}e.add(sr)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),tr.copy(n.boundingSphere),tr.applyMatrix4(r),mi.copy(t.ray).recast(t.near),!(tr.containsPoint(mi.origin)===!1&&(mi.intersectSphere(tr,Wc)===null||mi.origin.distanceToSquared(Wc)>(t.far-t.near)**2))&&(Hc.copy(r).invert(),mi.copy(t.ray).applyMatrix4(Hc),!(n.boundingBox!==null&&mi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,mi)))}_computeIntersections(t,e,n){let s,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,g=r.attributes.normal,h=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,T=h.length;_<T;_++){let p=h[_],f=a[p.materialIndex],R=Math.max(p.start,m.start),P=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let S=R,A=P;S<A;S+=3){let w=o.getX(S),L=o.getX(S+1),x=o.getX(S+2);s=ar(this,f,t,n,l,u,g,w,L,x),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let _=Math.max(0,m.start),T=Math.min(o.count,m.start+m.count);for(let p=_,f=T;p<f;p+=3){let R=o.getX(p),P=o.getX(p+1),S=o.getX(p+2);s=ar(this,a,t,n,l,u,g,R,P,S),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let _=0,T=h.length;_<T;_++){let p=h[_],f=a[p.materialIndex],R=Math.max(p.start,m.start),P=Math.min(c.count,Math.min(p.start+p.count,m.start+m.count));for(let S=R,A=P;S<A;S+=3){let w=S,L=S+1,x=S+2;s=ar(this,f,t,n,l,u,g,w,L,x),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let _=Math.max(0,m.start),T=Math.min(c.count,m.start+m.count);for(let p=_,f=T;p<f;p+=3){let R=p,P=p+1,S=p+2;s=ar(this,a,t,n,l,u,g,R,P,S),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}};function eu(i,t,e,n,s,r,a,o){let c;if(t.side===Ge?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,t.side===ai,o),c===null)return null;rr.copy(o),rr.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(rr);return l<e.near||l>e.far?null:{distance:l,point:rr.clone(),object:i}}function ar(i,t,e,n,s,r,a,o,c,l){i.getVertexPosition(o,er),i.getVertexPosition(c,nr),i.getVertexPosition(l,ir);let u=eu(i,t,e,n,er,nr,ir,Xc);if(u){let g=new tt;Qn.getBarycoord(Xc,er,nr,ir,g),s&&(u.uv=Qn.getInterpolatedAttribute(s,o,c,l,g,new Qt)),r&&(u.uv1=Qn.getInterpolatedAttribute(r,o,c,l,g,new Qt)),a&&(u.normal=Qn.getInterpolatedAttribute(a,o,c,l,g,new tt),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let h={a:o,b:c,c:l,normal:new tt,materialIndex:0};Qn.getNormal(er,nr,ir,h.normal),u.face=h,u.barycoord=g}return u}var Mi=class extends We{constructor(t=null,e=1,n=1,s,r,a,o,c,l=Te,u=Te,g,h){super(null,a,o,c,l,u,s,r,g,h),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Si=class extends Pe{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}};var gi=new Ki,nu=new Qt(.5,.5),or=new tt,Ss=class{constructor(t=new fn,e=new fn,n=new fn,s=new fn,r=new fn,a=new fn){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=pn,n=!1){let s=this.planes,r=t.elements,a=r[0],o=r[1],c=r[2],l=r[3],u=r[4],g=r[5],h=r[6],m=r[7],_=r[8],T=r[9],p=r[10],f=r[11],R=r[12],P=r[13],S=r[14],A=r[15];if(s[0].setComponents(l-a,m-u,f-_,A-R).normalize(),s[1].setComponents(l+a,m+u,f+_,A+R).normalize(),s[2].setComponents(l+o,m+g,f+T,A+P).normalize(),s[3].setComponents(l-o,m-g,f-T,A-P).normalize(),n)s[4].setComponents(c,h,p,S).normalize(),s[5].setComponents(l-c,m-h,f-p,A-S).normalize();else if(s[4].setComponents(l-c,m-h,f-p,A-S).normalize(),e===pn)s[5].setComponents(l+c,m+h,f+p,A+S).normalize();else if(e===ms)s[5].setComponents(c,h,p,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),gi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),gi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(gi)}intersectsSprite(t){gi.center.set(0,0,0);let e=nu.distanceTo(t.center);return gi.radius=.7071067811865476+e,gi.applyMatrix4(t.matrixWorld),this.intersectsSphere(gi)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(or.x=s.normal.x>0?t.max.x:t.min.x,or.y=s.normal.y>0?t.max.y:t.min.y,or.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(or)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var bs=class extends We{constructor(t=[],e=oi,n,s,r,a,o,c,l,u){super(t,e,n,s,r,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}};var ei=class extends We{constructor(t,e,n=gn,s,r,a,o=Te,c=Te,l,u=Sn,g=1){if(u!==Sn&&u!==li)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:t,height:e,depth:g};super(h,s,r,a,o,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Zi(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},Ar=class extends ei{constructor(t,e=gn,n=oi,s,r,a=Te,o=Te,c,l=Sn){let u={width:t,height:t,depth:1},g=[u,u,u,u,u,u];super(t,t,e,n,s,r,a,o,c,l),this.image=g,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Es=class extends We{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Qi=class i extends Xe{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],u=[],g=[],h=0,m=0;_("z","y","x",-1,-1,n,e,t,a,r,0),_("z","y","x",1,-1,n,e,-t,a,r,1),_("x","z","y",1,1,t,n,e,s,a,2),_("x","z","y",1,-1,t,n,-e,s,a,3),_("x","y","z",1,-1,t,e,n,s,r,4),_("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new rn(l,3)),this.setAttribute("normal",new rn(u,3)),this.setAttribute("uv",new rn(g,2));function _(T,p,f,R,P,S,A,w,L,x,C){let F=S/L,q=A/x,O=S/2,Z=A/2,D=w/2,H=L+1,et=x+1,k=0,ct=0,ot=new tt;for(let j=0;j<et;j++){let rt=j*q-Z;for(let It=0;It<H;It++){let Pt=It*F-O;ot[T]=Pt*R,ot[p]=rt*P,ot[f]=D,l.push(ot.x,ot.y,ot.z),ot[T]=0,ot[p]=0,ot[f]=w>0?1:-1,u.push(ot.x,ot.y,ot.z),g.push(It/L),g.push(1-j/x),k+=1}}for(let j=0;j<x;j++)for(let rt=0;rt<L;rt++){let It=h+rt+H*j,Pt=h+rt+H*(j+1),ie=h+(rt+1)+H*(j+1),Vt=h+(rt+1)+H*j;c.push(It,Pt,Vt),c.push(Pt,ie,Vt),ct+=6}o.addGroup(m,ct,C),m+=ct,h+=k}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var Ts=class i extends Xe{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(n),c=Math.floor(s),l=o+1,u=c+1,g=t/o,h=e/c,m=[],_=[],T=[],p=[];for(let f=0;f<u;f++){let R=f*h-a;for(let P=0;P<l;P++){let S=P*g-r;_.push(S,-R,0),T.push(0,0,1),p.push(P/o),p.push(1-f/c)}}for(let f=0;f<c;f++)for(let R=0;R<o;R++){let P=R+l*f,S=R+l*(f+1),A=R+1+l*(f+1),w=R+1+l*f;m.push(P,S,w),m.push(S,A,w)}this.setIndex(m),this.setAttribute("position",new rn(_,3)),this.setAttribute("normal",new rn(T,3)),this.setAttribute("uv",new rn(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}};function Ai(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];if(qc(s))s.isRenderTargetTexture?(Wt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(qc(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function ke(i){let t={};for(let e=0;e<i.length;e++){let n=Ai(i[e]);for(let s in n)t[s]=n[s]}return t}function qc(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function iu(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Ho(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ee.workingColorSpace}var Dl={clone:Ai,merge:ke},su=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ru=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ke=class extends yi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=su,this.fragmentShader=ru,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ai(t.uniforms),this.uniformsGroups=iu(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new oe().setHex(s.value);break;case"v2":this.uniforms[n].value=new Qt().fromArray(s.value);break;case"v3":this.uniforms[n].value=new tt().fromArray(s.value);break;case"v4":this.uniforms[n].value=new xe().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Zt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Me().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},ni=class extends Ke{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var Cr=class extends yi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=xl,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Rr=class extends yi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Gi(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function ho(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var ii=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let a;e:{i:if(!(t<s)){for(let o=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=e[++n],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Ir=class extends ii{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:fo,endingEnd:fo}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case po:r=t,o=2*e-n;break;case mo:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case po:a=t,c=2*n-e;break;case mo:a=1,c=n+s[1]-s[0];break;default:a=t-1,c=e}let l=(n-e)*.5,u=this.valueSize;this._weightPrev=l/(e-o),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,u=this._offsetPrev,g=this._offsetNext,h=this._weightPrev,m=this._weightNext,_=(n-e)/(s-e),T=_*_,p=T*_,f=-h*p+2*h*T-h*_,R=(1+h)*p+(-1.5-2*h)*T+(-.5+h)*_+1,P=(-1-m)*p+(1.5+m)*T+.5*_,S=m*p-m*T;for(let A=0;A!==o;++A)r[A]=f*a[u+A]+R*a[l+A]+P*a[c+A]+S*a[g+A];return r}},Pr=class extends ii{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,u=(n-e)/(s-e),g=1-u;for(let h=0;h!==o;++h)r[h]=a[l+h]*g+a[c+h]*u;return r}},Lr=class extends ii{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Dr=class extends ii{interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,u=this.inTangents,g=this.outTangents;if(!u||!g){let _=(n-e)/(s-e),T=1-_;for(let p=0;p!==o;++p)r[p]=a[l+p]*T+a[c+p]*_;return r}let h=o*2,m=t-1;for(let _=0;_!==o;++_){let T=a[l+_],p=a[c+_],f=m*h+_*2,R=g[f],P=g[f+1],S=t*h+_*2,A=u[S],w=u[S+1],L=ou(n,e,R,A,s);r[_]=Nl(L,T,P,w,p)}return r}};function Nl(i,t,e,n,s){let r=1-i;return r*r*r*t+3*r*r*i*e+3*r*i*i*n+i*i*i*s}function au(i,t,e,n,s){let r=1-i;return 3*r*r*(e-t)+6*r*i*(n-e)+3*i*i*(s-n)}function ou(i,t,e,n,s){let r=(i-t)/(s-t);for(let a=0;a<8;a++){let o=Nl(r,t,e,n,s)-i;if(Math.abs(o)<1e-10)break;let c=au(r,t,e,n,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-o/c))}return r}var Qe=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Gi(e,this.TimeBufferType),this.values=Gi(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Gi(t.times,Array),values:Gi(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s),ho(t.settings)&&(n.settings={inTangents:Gi(t.settings.inTangents,Array),outTangents:Gi(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Lr(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Pr(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Ir(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Dr(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case fs:e=this.InterpolantFactoryMethodDiscrete;break;case Mr:e=this.InterpolantFactoryMethodLinear;break;case hr:e=this.InterpolantFactoryMethodSmooth;break;case uo:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Wt("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return fs;case this.InterpolantFactoryMethodLinear:return Mr;case this.InterpolantFactoryMethodSmooth:return hr;case this.InterpolantFactoryMethodBezier:return uo}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t;ho(this.settings)&&(Yc(this.settings.inTangents,t),Yc(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(qt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(qt("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){qt("KeyframeTrack: Time is not a valid number.",this,o,c),t=!1;break}if(a!==null&&a>c){qt("KeyframeTrack: Out of order keys.",this,o,c,a),t=!1;break}a=c}if(s!==void 0&&Oh(s))for(let o=0,c=s.length;o!==c;++o){let l=s[o];if(isNaN(l)){qt("KeyframeTrack: Value is not a valid number.",this,o,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===hr,r=t.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=t[o],u=t[o+1];if(l!==u&&(o!==1||l!==t[0]))if(s)c=!0;else{let g=o*n,h=g-n,m=g+n;for(let _=0;_!==n;++_){let T=e[g+_];if(T!==e[h+_]||T!==e[m+_]){c=!0;break}}}if(c){if(o!==a){t[a]=t[o];let g=o*n,h=a*n;for(let m=0;m!==n;++m)e[h+m]=e[g+m]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)e[c+l]=e[o+l];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,ho(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Yc(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]*=t}Qe.prototype.ValueTypeName="";Qe.prototype.TimeBufferType=Float32Array;Qe.prototype.ValueBufferType=Float32Array;Qe.prototype.DefaultInterpolation=Mr;var si=class extends Qe{constructor(t,e,n){super(t,e,n)}};si.prototype.ValueTypeName="bool";si.prototype.ValueBufferType=Array;si.prototype.DefaultInterpolation=fs;si.prototype.InterpolantFactoryMethodLinear=void 0;si.prototype.InterpolantFactoryMethodSmooth=void 0;var Nr=class extends Qe{constructor(t,e,n,s){super(t,e,n,s)}};Nr.prototype.ValueTypeName="color";var Ur=class extends Qe{constructor(t,e,n,s){super(t,e,n,s)}};Ur.prototype.ValueTypeName="number";var Fr=class extends ii{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-e)/(s-e),l=t*o;for(let u=l+o;l!==u;l+=4)En.slerpFlat(r,0,a,l-o,a,l,c);return r}},ws=class extends Qe{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new Fr(this.times,this.values,this.getValueSize(),t)}};ws.prototype.ValueTypeName="quaternion";ws.prototype.InterpolantFactoryMethodSmooth=void 0;var ri=class extends Qe{constructor(t,e,n){super(t,e,n)}};ri.prototype.ValueTypeName="string";ri.prototype.ValueBufferType=Array;ri.prototype.DefaultInterpolation=fs;ri.prototype.InterpolantFactoryMethodLinear=void 0;ri.prototype.InterpolantFactoryMethodSmooth=void 0;var Or=class extends Qe{constructor(t,e,n,s){super(t,e,n,s)}};Or.prototype.ValueTypeName="vector";var Br=class{constructor(t,e,n){let s=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,g){return l.push(u,g),this},this.removeHandler=function(u){let g=l.indexOf(u);return g!==-1&&l.splice(g,2),this},this.getHandler=function(u){for(let g=0,h=l.length;g<h;g+=2){let m=l[g],_=l[g+1];if(m.global&&(m.lastIndex=0),m.test(u))return _}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Ul=new Br,zr=class{constructor(t){this.manager=t!==void 0?t:Ul,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};zr.DEFAULT_MATERIAL_NAME="__DEFAULT";var cr=new tt,lr=new En,yn=new tt,As=class extends an{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Me,this.projectionMatrix=new Me,this.projectionMatrixInverse=new Me,this.coordinateSystem=pn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(cr,lr,yn),yn.x===1&&yn.y===1&&yn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(cr,lr,yn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(cr,lr,yn),yn.x===1&&yn.y===1&&yn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(cr,lr,yn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Kn=new tt,Zc=new Qt,$c=new Qt,Oe=class extends As{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Sr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Ha*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Sr*2*Math.atan(Math.tan(Ha*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Kn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Kn.x,Kn.y).multiplyScalar(-t/Kn.z),Kn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Kn.x,Kn.y).multiplyScalar(-t/Kn.z)}getViewSize(t,e){return this.getViewBounds(t,Zc,$c),e.subVectors($c,Zc)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Ha*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,e-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var bi=class extends As{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,a=n+t,o=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}};var Cs=class extends Xe{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){let t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}};var Hi=-90,Wi=1,kr=class extends an{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Oe(Hi,Wi,t,e);s.layers=this.layers,this.add(s);let r=new Oe(Hi,Wi,t,e);r.layers=this.layers,this.add(r);let a=new Oe(Hi,Wi,t,e);a.layers=this.layers,this.add(a);let o=new Oe(Hi,Wi,t,e);o.layers=this.layers,this.add(o);let c=new Oe(Hi,Wi,t,e);c.layers=this.layers,this.add(c);let l=new Oe(Hi,Wi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,c]=e;for(let l of e)this.remove(l);if(t===pn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===ms)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,u]=this.children,g=t.getRenderTarget(),h=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;let T=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let p=!1;t.isWebGLRenderer===!0?p=t.state.buffers.depth.getReversed():p=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(n,4,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),n.texture.generateMipmaps=T,t.setRenderTarget(n,5,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,u),t.setRenderTarget(g,h,m),t.xr.enabled=_,n.texture.needsPMREMUpdate=!0}},Vr=class extends Oe{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var Wo="\\[\\]\\.:\\/",cu=new RegExp("["+Wo+"]","g"),Xo="[^"+Wo+"]",lu="[^"+Wo.replace("\\.","")+"]",hu=/((?:WC+[\/:])*)/.source.replace("WC",Xo),uu=/(WCOD+)?/.source.replace("WCOD",lu),du=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Xo),fu=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Xo),pu=new RegExp("^"+hu+uu+du+fu+"$"),mu=["material","materials","bones","map"],go=class{constructor(t,e,n){let s=n||_e.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},_e=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(cu,"")}static parseTrackName(t){let e=pu.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);mu.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let c=n(o.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Wt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){qt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){qt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){qt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===l){l=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){qt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){qt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){qt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){qt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let a=t[s];if(a===void 0){let l=e.nodeName;qt("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){qt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){qt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};_e.Composite=go;_e.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};_e.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};_e.prototype.GetterByBindingType=[_e.prototype._getValue_direct,_e.prototype._getValue_array,_e.prototype._getValue_arrayElement,_e.prototype._getValue_toArray];_e.prototype.SetterByBindingTypeAndVersioning=[[_e.prototype._setValue_direct,_e.prototype._setValue_direct_setNeedsUpdate,_e.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[_e.prototype._setValue_array,_e.prototype._setValue_array_setNeedsUpdate,_e.prototype._setValue_array_setMatrixWorldNeedsUpdate],[_e.prototype._setValue_arrayElement,_e.prototype._setValue_arrayElement_setNeedsUpdate,_e.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[_e.prototype._setValue_fromArray,_e.prototype._setValue_fromArray_setNeedsUpdate,_e.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Sm=new Float32Array(1);var Ko=class Ko{constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};Ko.prototype.isMatrix2=!0;var _o=Ko;function qo(i,t,e,n){let s=gu(n);switch(e){case Oo:return i*t;case zo:return i*t/s.components*s.byteLength;case Jr:return i*t/s.components*s.byteLength;case hi:return i*t*2/s.components*s.byteLength;case Kr:return i*t*2/s.components*s.byteLength;case Bo:return i*t*3/s.components*s.byteLength;case ze:return i*t*4/s.components*s.byteLength;case Qr:return i*t*4/s.components*s.byteLength;case Ls:case Ds:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ns:case Us:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ta:case na:return Math.max(i,16)*Math.max(t,8)/4;case jr:case ea:return Math.max(i,8)*Math.max(t,8)/2;case ia:case sa:case aa:case oa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ra:case Fs:case ca:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case la:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ha:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case ua:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case da:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case fa:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case pa:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case ma:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case ga:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case _a:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case xa:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case va:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case ya:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Ma:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Sa:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case ba:case Ea:case Ta:return Math.ceil(i/4)*Math.ceil(t/4)*16;case wa:case Aa:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Os:case Ca:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function gu(i){switch(i){case je:case Do:return{byteLength:1,components:1};case es:case No:case tn:return{byteLength:2,components:1};case Zr:case $r:return{byteLength:2,components:4};case gn:case Yr:case qe:return{byteLength:4,components:1};case Uo:case Fo:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Wt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function ih(){let i=null,t=!1,e=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),e(r,a)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function xu(i){let t=new WeakMap;function e(o,c){let l=o.array,u=o.usage,g=l.byteLength,h=i.createBuffer();i.bindBuffer(c,h),i.bufferData(c,l,u),o.onUploadCallback();let m;if(l instanceof Float32Array)m=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)m=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=i.SHORT;else if(l instanceof Uint32Array)m=i.UNSIGNED_INT;else if(l instanceof Int32Array)m=i.INT;else if(l instanceof Int8Array)m=i.BYTE;else if(l instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:g}}function n(o,c,l){let u=c.array,g=c.updateRanges;if(i.bindBuffer(l,o),g.length===0)i.bufferSubData(l,0,u);else{g.sort((m,_)=>m.start-_.start);let h=0;for(let m=1;m<g.length;m++){let _=g[h],T=g[m];T.start<=_.start+_.count+1?_.count=Math.max(_.count,T.start+T.count-_.start):(++h,g[h]=T)}g.length=h+1;for(let m=0,_=g.length;m<_;m++){let T=g[m];i.bufferSubData(l,T.start*u.BYTES_PER_ELEMENT,u,T.start,T.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=t.get(o);c&&(i.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var vu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,yu=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Mu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Su=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,bu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Eu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Tu=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,wu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Au=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Cu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ru=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Iu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Pu=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Lu=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Du=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Nu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Uu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Fu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ou=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Bu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,zu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,ku=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Vu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Gu=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Hu=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Wu=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Xu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,qu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Yu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Zu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,$u="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ju=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ku=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Qu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,ju=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,td=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ed=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,nd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,id=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,sd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,rd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ad=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,od=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,cd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ld=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,hd=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,ud=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,dd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,fd=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,pd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,md=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,gd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,_d=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,xd=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,vd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,yd=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Md=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Sd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,bd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ed=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Td=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,wd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ad=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Cd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Rd=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Id=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Pd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ld=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Dd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Nd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ud=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Fd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Od=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Bd=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,zd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,kd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Gd=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Hd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Wd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Xd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,qd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Yd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Zd=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,$d=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Jd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Kd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Qd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,jd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,tf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ef=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,nf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,sf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,rf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,af=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,of=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,cf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,lf=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,hf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,uf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,df=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ff=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,pf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,mf=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,gf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,_f=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,xf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,vf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,yf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Mf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Sf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ef=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Tf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Af=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Cf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Rf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,If=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Pf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lf=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Df=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Nf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Uf=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ff=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Of=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Bf=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,zf=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kf=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Vf=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Gf=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Hf=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wf=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Xf=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qf=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Yf=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zf=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,$f=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Jf=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Kf=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Qf=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,jf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,jt={alphahash_fragment:vu,alphahash_pars_fragment:yu,alphamap_fragment:Mu,alphamap_pars_fragment:Su,alphatest_fragment:bu,alphatest_pars_fragment:Eu,aomap_fragment:Tu,aomap_pars_fragment:wu,batching_pars_vertex:Au,batching_vertex:Cu,begin_vertex:Ru,beginnormal_vertex:Iu,bsdfs:Pu,iridescence_fragment:Lu,bumpmap_pars_fragment:Du,clipping_planes_fragment:Nu,clipping_planes_pars_fragment:Uu,clipping_planes_pars_vertex:Fu,clipping_planes_vertex:Ou,color_fragment:Bu,color_pars_fragment:zu,color_pars_vertex:ku,color_vertex:Vu,common:Gu,cube_uv_reflection_fragment:Hu,defaultnormal_vertex:Wu,displacementmap_pars_vertex:Xu,displacementmap_vertex:qu,emissivemap_fragment:Yu,emissivemap_pars_fragment:Zu,colorspace_fragment:$u,colorspace_pars_fragment:Ju,envmap_fragment:Ku,envmap_common_pars_fragment:Qu,envmap_pars_fragment:ju,envmap_pars_vertex:td,envmap_physical_pars_fragment:ud,envmap_vertex:ed,fog_vertex:nd,fog_pars_vertex:id,fog_fragment:sd,fog_pars_fragment:rd,gradientmap_pars_fragment:ad,lightmap_pars_fragment:od,lights_lambert_fragment:cd,lights_lambert_pars_fragment:ld,lights_pars_begin:hd,lights_toon_fragment:dd,lights_toon_pars_fragment:fd,lights_phong_fragment:pd,lights_phong_pars_fragment:md,lights_physical_fragment:gd,lights_physical_pars_fragment:_d,lights_fragment_begin:xd,lights_fragment_maps:vd,lights_fragment_end:yd,lightprobes_pars_fragment:Md,logdepthbuf_fragment:Sd,logdepthbuf_pars_fragment:bd,logdepthbuf_pars_vertex:Ed,logdepthbuf_vertex:Td,map_fragment:wd,map_pars_fragment:Ad,map_particle_fragment:Cd,map_particle_pars_fragment:Rd,metalnessmap_fragment:Id,metalnessmap_pars_fragment:Pd,morphinstance_vertex:Ld,morphcolor_vertex:Dd,morphnormal_vertex:Nd,morphtarget_pars_vertex:Ud,morphtarget_vertex:Fd,normal_fragment_begin:Od,normal_fragment_maps:Bd,normal_pars_fragment:zd,normal_pars_vertex:kd,normal_vertex:Vd,normalmap_pars_fragment:Gd,clearcoat_normal_fragment_begin:Hd,clearcoat_normal_fragment_maps:Wd,clearcoat_pars_fragment:Xd,iridescence_pars_fragment:qd,opaque_fragment:Yd,packing:Zd,premultiplied_alpha_fragment:$d,project_vertex:Jd,dithering_fragment:Kd,dithering_pars_fragment:Qd,roughnessmap_fragment:jd,roughnessmap_pars_fragment:tf,shadowmap_pars_fragment:ef,shadowmap_pars_vertex:nf,shadowmap_vertex:sf,shadowmask_pars_fragment:rf,skinbase_vertex:af,skinning_pars_vertex:of,skinning_vertex:cf,skinnormal_vertex:lf,specularmap_fragment:hf,specularmap_pars_fragment:uf,tonemapping_fragment:df,tonemapping_pars_fragment:ff,transmission_fragment:pf,transmission_pars_fragment:mf,uv_pars_fragment:gf,uv_pars_vertex:_f,uv_vertex:xf,worldpos_vertex:vf,background_vert:yf,background_frag:Mf,backgroundCube_vert:Sf,backgroundCube_frag:bf,cube_vert:Ef,cube_frag:Tf,depth_vert:wf,depth_frag:Af,distance_vert:Cf,distance_frag:Rf,equirect_vert:If,equirect_frag:Pf,linedashed_vert:Lf,linedashed_frag:Df,meshbasic_vert:Nf,meshbasic_frag:Uf,meshlambert_vert:Ff,meshlambert_frag:Of,meshmatcap_vert:Bf,meshmatcap_frag:zf,meshnormal_vert:kf,meshnormal_frag:Vf,meshphong_vert:Gf,meshphong_frag:Hf,meshphysical_vert:Wf,meshphysical_frag:Xf,meshtoon_vert:qf,meshtoon_frag:Yf,points_vert:Zf,points_frag:$f,shadow_vert:Jf,shadow_frag:Kf,sprite_vert:Qf,sprite_frag:jf},Tt={common:{diffuse:{value:new oe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Zt}},envmap:{envMap:{value:null},envMapRotation:{value:new Zt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Zt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Zt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Zt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Zt},normalScale:{value:new Qt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Zt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Zt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Zt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Zt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new oe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new tt},probesMax:{value:new tt},probesResolution:{value:new tt}},points:{diffuse:{value:new oe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0},uvTransform:{value:new Zt}},sprite:{diffuse:{value:new oe(16777215)},opacity:{value:1},center:{value:new Qt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}}},An={basic:{uniforms:ke([Tt.common,Tt.specularmap,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.fog]),vertexShader:jt.meshbasic_vert,fragmentShader:jt.meshbasic_frag},lambert:{uniforms:ke([Tt.common,Tt.specularmap,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.fog,Tt.lights,{emissive:{value:new oe(0)},envMapIntensity:{value:1}}]),vertexShader:jt.meshlambert_vert,fragmentShader:jt.meshlambert_frag},phong:{uniforms:ke([Tt.common,Tt.specularmap,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.fog,Tt.lights,{emissive:{value:new oe(0)},specular:{value:new oe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:jt.meshphong_vert,fragmentShader:jt.meshphong_frag},standard:{uniforms:ke([Tt.common,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.roughnessmap,Tt.metalnessmap,Tt.fog,Tt.lights,{emissive:{value:new oe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:jt.meshphysical_vert,fragmentShader:jt.meshphysical_frag},toon:{uniforms:ke([Tt.common,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.gradientmap,Tt.fog,Tt.lights,{emissive:{value:new oe(0)}}]),vertexShader:jt.meshtoon_vert,fragmentShader:jt.meshtoon_frag},matcap:{uniforms:ke([Tt.common,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.fog,{matcap:{value:null}}]),vertexShader:jt.meshmatcap_vert,fragmentShader:jt.meshmatcap_frag},points:{uniforms:ke([Tt.points,Tt.fog]),vertexShader:jt.points_vert,fragmentShader:jt.points_frag},dashed:{uniforms:ke([Tt.common,Tt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:jt.linedashed_vert,fragmentShader:jt.linedashed_frag},depth:{uniforms:ke([Tt.common,Tt.displacementmap]),vertexShader:jt.depth_vert,fragmentShader:jt.depth_frag},normal:{uniforms:ke([Tt.common,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,{opacity:{value:1}}]),vertexShader:jt.meshnormal_vert,fragmentShader:jt.meshnormal_frag},sprite:{uniforms:ke([Tt.sprite,Tt.fog]),vertexShader:jt.sprite_vert,fragmentShader:jt.sprite_frag},background:{uniforms:{uvTransform:{value:new Zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:jt.background_vert,fragmentShader:jt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Zt}},vertexShader:jt.backgroundCube_vert,fragmentShader:jt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:jt.cube_vert,fragmentShader:jt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:jt.equirect_vert,fragmentShader:jt.equirect_frag},distance:{uniforms:ke([Tt.common,Tt.displacementmap,{referencePosition:{value:new tt},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:jt.distance_vert,fragmentShader:jt.distance_frag},shadow:{uniforms:ke([Tt.lights,Tt.fog,{color:{value:new oe(0)},opacity:{value:1}}]),vertexShader:jt.shadow_vert,fragmentShader:jt.shadow_frag}};An.physical={uniforms:ke([An.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Zt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Zt},clearcoatNormalScale:{value:new Qt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Zt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Zt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Zt},sheen:{value:0},sheenColor:{value:new oe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Zt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Zt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Zt},transmissionSamplerSize:{value:new Qt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Zt},attenuationDistance:{value:0},attenuationColor:{value:new oe(0)},specularColor:{value:new oe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Zt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Zt},anisotropyVector:{value:new Qt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Zt}}]),vertexShader:jt.meshphysical_vert,fragmentShader:jt.meshphysical_frag};var Pa={r:0,b:0,g:0},tp=new Me,sh=new Zt;sh.set(-1,0,0,0,1,0,0,0,1);function ep(i,t,e,n,s,r){let a=new oe(0),o=s===!0?0:1,c,l,u=null,g=0,h=null;function m(R){let P=R.isScene===!0?R.background:null;if(P&&P.isTexture){let S=R.backgroundBlurriness>0;P=t.get(P,S)}return P}function _(R){let P=!1,S=m(R);S===null?p(a,o):S&&S.isColor&&(p(S,1),P=!0);let A=i.xr.getEnvironmentBlendMode();A==="additive"?e.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||P)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function T(R,P){let S=m(P);S&&(S.isCubeTexture||S.mapping===Is)?(l===void 0&&(l=new Be(new Qi(1,1,1),new Ke({name:"BackgroundCubeMaterial",uniforms:Ai(An.backgroundCube.uniforms),vertexShader:An.backgroundCube.vertexShader,fragmentShader:An.backgroundCube.fragmentShader,side:Ge,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(A,w,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=S,l.material.uniforms.backgroundBlurriness.value=P.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=P.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(tp.makeRotationFromEuler(P.backgroundRotation)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(sh),l.material.toneMapped=ee.getTransfer(S.colorSpace)!==ue,(u!==S||g!==S.version||h!==i.toneMapping)&&(l.material.needsUpdate=!0,u=S,g=S.version,h=i.toneMapping),l.layers.enableAll(),R.unshift(l,l.geometry,l.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new Be(new Ts(2,2),new Ke({name:"BackgroundMaterial",uniforms:Ai(An.background.uniforms),vertexShader:An.background.vertexShader,fragmentShader:An.background.fragmentShader,side:ai,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=P.backgroundIntensity,c.material.toneMapped=ee.getTransfer(S.colorSpace)!==ue,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||g!==S.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,u=S,g=S.version,h=i.toneMapping),c.layers.enableAll(),R.unshift(c,c.geometry,c.material,0,0,null))}function p(R,P){R.getRGB(Pa,Ho(i)),e.buffers.color.setClear(Pa.r,Pa.g,Pa.b,P,r)}function f(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(R,P=1){a.set(R),o=P,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(R){o=R,p(a,o)},render:_,addToRenderList:T,dispose:f}}function np(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null),r=s,a=!1;function o(q,O,Z,D,H){let et=!1,k=g(q,D,Z,O);r!==k&&(r=k,l(r.object)),et=m(q,D,Z,H),et&&_(q,D,Z,H),H!==null&&t.update(H,i.ELEMENT_ARRAY_BUFFER),(et||a)&&(a=!1,S(q,O,Z,D),H!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(H).buffer))}function c(){return i.createVertexArray()}function l(q){return i.bindVertexArray(q)}function u(q){return i.deleteVertexArray(q)}function g(q,O,Z,D){let H=D.wireframe===!0,et=n[O.id];et===void 0&&(et={},n[O.id]=et);let k=q.isInstancedMesh===!0?q.id:0,ct=et[k];ct===void 0&&(ct={},et[k]=ct);let ot=ct[Z.id];ot===void 0&&(ot={},ct[Z.id]=ot);let j=ot[H];return j===void 0&&(j=h(c()),ot[H]=j),j}function h(q){let O=[],Z=[],D=[];for(let H=0;H<e;H++)O[H]=0,Z[H]=0,D[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:Z,attributeDivisors:D,object:q,attributes:{},index:null}}function m(q,O,Z,D){let H=r.attributes,et=O.attributes,k=0,ct=Z.getAttributes();for(let ot in ct)if(ct[ot].location>=0){let rt=H[ot],It=et[ot];if(It===void 0&&(ot==="instanceMatrix"&&q.instanceMatrix&&(It=q.instanceMatrix),ot==="instanceColor"&&q.instanceColor&&(It=q.instanceColor)),rt===void 0||rt.attribute!==It||It&&rt.data!==It.data)return!0;k++}return r.attributesNum!==k||r.index!==D}function _(q,O,Z,D){let H={},et=O.attributes,k=0,ct=Z.getAttributes();for(let ot in ct)if(ct[ot].location>=0){let rt=et[ot];rt===void 0&&(ot==="instanceMatrix"&&q.instanceMatrix&&(rt=q.instanceMatrix),ot==="instanceColor"&&q.instanceColor&&(rt=q.instanceColor));let It={};It.attribute=rt,rt&&rt.data&&(It.data=rt.data),H[ot]=It,k++}r.attributes=H,r.attributesNum=k,r.index=D}function T(){let q=r.newAttributes;for(let O=0,Z=q.length;O<Z;O++)q[O]=0}function p(q){f(q,0)}function f(q,O){let Z=r.newAttributes,D=r.enabledAttributes,H=r.attributeDivisors;Z[q]=1,D[q]===0&&(i.enableVertexAttribArray(q),D[q]=1),H[q]!==O&&(i.vertexAttribDivisor(q,O),H[q]=O)}function R(){let q=r.newAttributes,O=r.enabledAttributes;for(let Z=0,D=O.length;Z<D;Z++)O[Z]!==q[Z]&&(i.disableVertexAttribArray(Z),O[Z]=0)}function P(q,O,Z,D,H,et,k){k===!0?i.vertexAttribIPointer(q,O,Z,H,et):i.vertexAttribPointer(q,O,Z,D,H,et)}function S(q,O,Z,D){T();let H=D.attributes,et=Z.getAttributes(),k=O.defaultAttributeValues;for(let ct in et){let ot=et[ct];if(ot.location>=0){let j=H[ct];if(j===void 0&&(ct==="instanceMatrix"&&q.instanceMatrix&&(j=q.instanceMatrix),ct==="instanceColor"&&q.instanceColor&&(j=q.instanceColor)),j!==void 0){let rt=j.normalized,It=j.itemSize,Pt=t.get(j);if(Pt===void 0)continue;let ie=Pt.buffer,Vt=Pt.type,Jt=Pt.bytesPerElement,it=Vt===i.INT||Vt===i.UNSIGNED_INT||j.gpuType===Yr;if(j.isInterleavedBufferAttribute){let ht=j.data,At=ht.stride,Gt=j.offset;if(ht.isInstancedInterleavedBuffer){for(let Et=0;Et<ot.locationSize;Et++)f(ot.location+Et,ht.meshPerAttribute);q.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let Et=0;Et<ot.locationSize;Et++)p(ot.location+Et);i.bindBuffer(i.ARRAY_BUFFER,ie);for(let Et=0;Et<ot.locationSize;Et++)P(ot.location+Et,It/ot.locationSize,Vt,rt,At*Jt,(Gt+It/ot.locationSize*Et)*Jt,it)}else{if(j.isInstancedBufferAttribute){for(let ht=0;ht<ot.locationSize;ht++)f(ot.location+ht,j.meshPerAttribute);q.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let ht=0;ht<ot.locationSize;ht++)p(ot.location+ht);i.bindBuffer(i.ARRAY_BUFFER,ie);for(let ht=0;ht<ot.locationSize;ht++)P(ot.location+ht,It/ot.locationSize,Vt,rt,It*Jt,It/ot.locationSize*ht*Jt,it)}}else if(k!==void 0){let rt=k[ct];if(rt!==void 0)switch(rt.length){case 2:i.vertexAttrib2fv(ot.location,rt);break;case 3:i.vertexAttrib3fv(ot.location,rt);break;case 4:i.vertexAttrib4fv(ot.location,rt);break;default:i.vertexAttrib1fv(ot.location,rt)}}}}R()}function A(){C();for(let q in n){let O=n[q];for(let Z in O){let D=O[Z];for(let H in D){let et=D[H];for(let k in et)u(et[k].object),delete et[k];delete D[H]}}delete n[q]}}function w(q){if(n[q.id]===void 0)return;let O=n[q.id];for(let Z in O){let D=O[Z];for(let H in D){let et=D[H];for(let k in et)u(et[k].object),delete et[k];delete D[H]}}delete n[q.id]}function L(q){for(let O in n){let Z=n[O];for(let D in Z){let H=Z[D];if(H[q.id]===void 0)continue;let et=H[q.id];for(let k in et)u(et[k].object),delete et[k];delete H[q.id]}}}function x(q){for(let O in n){let Z=n[O],D=q.isInstancedMesh===!0?q.id:0,H=Z[D];if(H!==void 0){for(let et in H){let k=H[et];for(let ct in k)u(k[ct].object),delete k[ct];delete H[et]}delete Z[D],Object.keys(Z).length===0&&delete n[O]}}}function C(){F(),a=!0,r!==s&&(r=s,l(r.object))}function F(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:C,resetDefaultState:F,dispose:A,releaseStatesOfGeometry:w,releaseStatesOfObject:x,releaseStatesOfProgram:L,initAttributes:T,enableAttribute:p,disableUnusedAttributes:R}}function ip(i,t,e){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),e.update(l,n,1)}function a(c,l,u){u!==0&&(i.drawArraysInstanced(n,c,l,u),e.update(l,n,u))}function o(c,l,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,u);let h=0;for(let m=0;m<u;m++)h+=l[m];e.update(h,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function sp(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let L=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(L){return!(L!==ze&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(L){let x=L===tn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(L!==je&&L!==qe&&!x&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(L){if(L==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",u=c(l);u!==l&&(Wt("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let g=e.logarithmicDepthBuffer===!0,h=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&h===!1&&Wt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),T=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),R=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),P=i.getParameter(i.MAX_VARYING_VECTORS),S=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=i.getParameter(i.MAX_SAMPLES),w=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:g,reversedDepthBuffer:h,maxTextures:m,maxVertexTextures:_,maxTextureSize:T,maxCubemapSize:p,maxAttributes:f,maxVertexUniforms:R,maxVaryings:P,maxFragmentUniforms:S,maxSamples:A,samples:w}}function rp(i){let t=this,e=null,n=0,s=!1,r=!1,a=new fn,o=new Zt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(g,h){let m=g.length!==0||h||n!==0||s;return s=h,n=g.length,m},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(g,h){e=u(g,h,0)},this.setState=function(g,h,m){let _=g.clippingPlanes,T=g.clipIntersection,p=g.clipShadows,f=i.get(g);if(!s||_===null||_.length===0||r&&!p)r?u(null):l();else{let R=r?0:n,P=R*4,S=f.clippingState||null;c.value=S,S=u(_,h,P,m);for(let A=0;A!==P;++A)S[A]=e[A];f.clippingState=S,this.numIntersection=T?this.numPlanes:0,this.numPlanes+=R}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(g,h,m,_){let T=g!==null?g.length:0,p=null;if(T!==0){if(p=c.value,_!==!0||p===null){let f=m+T*4,R=h.matrixWorldInverse;o.getNormalMatrix(R),(p===null||p.length<f)&&(p=new Float32Array(f));for(let P=0,S=m;P!==T;++P,S+=4)a.copy(g[P]).applyMatrix4(R,o),a.normal.toArray(p,S),p[S+3]=a.constant}c.value=p,c.needsUpdate=!0}return t.numPlanes=T,t.numIntersection=0,p}}var ss=4,ap=6,op=20,cp=256,zs=new bi,Fl=new oe,Qo=null,jo=0,tc=0,ec=!1,lp=new tt,Ci=new tt,Da=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){let{size:a=256,position:o=lp}=r;Qo=this._renderer.getRenderTarget(),jo=this._renderer.getActiveCubeFace(),tc=this._renderer.getActiveMipmapLevel(),ec=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,o),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=zl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Bl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Qo,jo,tc),this._renderer.xr.enabled=ec,t.scissorTest=!1,is(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===oi||t.mapping===Ti?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Qo=this._renderer.getRenderTarget(),jo=this._renderer.getActiveCubeFace(),tc=this._renderer.getActiveMipmapLevel(),ec=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:we,minFilter:we,generateMipmaps:!1,type:tn,format:ze,colorSpace:vi,depthBuffer:!1},s=Ol(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ol(t,e,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=hp(r)),this._blurMaterial=dp(r,t,e),this._ggxMaterial=up(r,t,e)}return s}_compileMaterial(t){let e=new Be(new Xe,t);this._renderer.compile(e,zs)}_sceneToCubeUV(t,e,n,s,r){let c=new Oe(90,1,e,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],g=this._renderer,h=g.autoClear,m=g.toneMapping;g.getClearColor(Fl),g.toneMapping=mn,g.autoClear=!1,g.state.buffers.depth.getReversed()&&(g.setRenderTarget(s),g.clearDepth(),g.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Be(new Qi,new Ms({name:"PMREM.Background",side:Ge,depthWrite:!1,depthTest:!1})));let T=this._backgroundBox,p=T.material,f=!1,R=t.background;R?R.isColor&&(p.color.copy(R),t.background=null,f=!0):(p.color.copy(Fl),f=!0);for(let P=0;P<6;P++){let S=P%3;S===0?(c.up.set(0,l[P],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[P],r.y,r.z)):S===1?(c.up.set(0,0,l[P]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[P],r.z)):(c.up.set(0,l[P],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[P]));let A=this._cubeSize;is(s,S*A,P>2?A:0,A,A),g.setRenderTarget(s),f&&g.render(T,c),g.render(t,c)}g.toneMapping=m,g.autoClear=h,t.background=R}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===oi||t.mapping===Ti;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=zl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Bl());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=t;let c=this._cubeSize;is(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(a,zs)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let c=a.uniforms,l=n/(this._lodMeshes.length-1),u=e/(this._lodMeshes.length-1),g=Math.sqrt(l*l-u*u),h=l*1.25,m=g*h,{_lodMax:_}=this,T=this._sizeLods[n],p=3*T*(n>_-ss?n-_+ss:0),f=4*(this._cubeSize-T);c.envMap.value=t.texture,c.roughness.value=m,c.mipInt.value=_-e,is(r,p,f,3*T,2*T),s.setRenderTarget(r),s.render(o,zs),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=_-n,is(t,p,f,3*T,2*T),s.setRenderTarget(t),s.render(o,zs)}_blur(t,e,n,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,n,a),this._blurPass(r,t,n,n,a)}_blurPass(t,e,n,s,r){let a=this._renderer,o=this._blurMaterial,c=this._lodMeshes[s];c.material=o;let l=o.uniforms;l.envMap.value=t.texture,l.sigma.value=r,l.mipInt.value=this._lodMax-n;let u=this._sizeLods[s],g=3*u*(s>this._lodMax-ss?s-this._lodMax+ss:0),h=4*(this._cubeSize-u);is(e,g,h,3*u,2*u),a.setRenderTarget(e),a.render(c,zs)}};function hp(i){let t=[],e=[],n=i,s=i-ss+1+ap;for(let r=0;r<s;r++){let a=Math.pow(2,n);t.push(a);let o=1/(a-2),c=-o,l=1+o,u=[c,c,l,c,l,l,c,c,l,l,c,l],g=6,h=6,m=3,_=new Float32Array(m*h*g),T=new Float32Array(m*h*g);for(let f=0;f<g;f++){let R=f%3*2/3-1,P=f>2?0:-1,S=[R,P,0,R+2/3,P,0,R+2/3,P+1,0,R,P,0,R+2/3,P+1,0,R,P+1,0];_.set(S,m*h*f);for(let A=0;A<h;A++){let w=u[A*2]*2-1,L=u[A*2+1]*2-1;f===0?Ci.set(1,L,w):f===1?Ci.set(-w,1,-L):f===2?Ci.set(-w,L,1):f===3?Ci.set(-1,L,-w):f===4?Ci.set(-w,-1,L):Ci.set(w,L,-1),Ci.toArray(T,(f*h+A)*m)}}let p=new Xe;p.setAttribute("position",new Pe(_,m)),p.setAttribute("outputDirection",new Pe(T,m)),e.push(new Be(p,null)),n>ss&&n--}return{lodMeshes:e,sizeLods:t}}function Ol(i,t,e){let n=new Ae(i,t,e);return n.texture.mapping=Is,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function is(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function up(i,t,e){return new Ke({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:cp,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Fa(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function dp(i,t,e){return new Ke({name:"SphericalGaussianBlur",defines:{SAMPLES:op,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Fa(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function Bl(){return new Ke({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Fa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function zl(){return new Ke({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Fa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function Fa(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Na=class extends Ae{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new bs(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Qi(5,5,5),r=new Ke({name:"CubemapFromEquirect",uniforms:Ai(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ge,blending:Tn});r.uniforms.tEquirect.value=e;let a=new Be(s,r),o=e.minFilter;return e.minFilter===ci&&(e.minFilter=we),new kr(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}};function fp(i){let t=new WeakMap,e=new WeakMap,n=null;function s(h,m=!1){return h==null?null:m?a(h):r(h)}function r(h){if(h&&h.isTexture){let m=h.mapping;if(m===Wr||m===Xr)if(t.has(h)){let _=t.get(h).texture;return o(_,h.mapping)}else{let _=h.image;if(_&&_.height>0){let T=new Na(_.height);return T.fromEquirectangularTexture(i,h),t.set(h,T),h.addEventListener("dispose",l),o(T.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){let m=h.mapping,_=m===Wr||m===Xr,T=m===oi||m===Ti;if(_||T){let p=e.get(h),f=p!==void 0?p.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==f)return n===null&&(n=new Da(i)),p=_?n.fromEquirectangular(h,p):n.fromCubemap(h,p),p.texture.pmremVersion=h.pmremVersion,e.set(h,p),p.texture;if(p!==void 0)return p.texture;{let R=h.image;return _&&R&&R.height>0||T&&R&&c(R)?(n===null&&(n=new Da(i)),p=_?n.fromEquirectangular(h):n.fromCubemap(h),p.texture.pmremVersion=h.pmremVersion,e.set(h,p),h.addEventListener("dispose",u),p.texture):null}}}return h}function o(h,m){return m===Wr?h.mapping=oi:m===Xr&&(h.mapping=Ti),h}function c(h){let m=0,_=6;for(let T=0;T<_;T++)h[T]!==void 0&&m++;return m===_}function l(h){let m=h.target;m.removeEventListener("dispose",l);let _=t.get(m);_!==void 0&&(t.delete(m),_.dispose())}function u(h){let m=h.target;m.removeEventListener("dispose",u);let _=e.get(m);_!==void 0&&(e.delete(m),_.dispose())}function g(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:g}}function pp(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&xi("WebGLRenderer: "+n+" extension not supported."),s}}}function mp(i,t,e,n){let s={},r=new WeakMap;function a(g){let h=g.target;h.index!==null&&t.remove(h.index);for(let _ in h.attributes)t.remove(h.attributes[_]);h.removeEventListener("dispose",a),delete s[h.id];let m=r.get(h);m&&(t.remove(m),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function o(g,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,e.memory.geometries++),h}function c(g){let h=g.attributes;for(let m in h)t.update(h[m],i.ARRAY_BUFFER)}function l(g){let h=[],m=g.index,_=g.attributes.position,T=0;if(_===void 0)return;if(m!==null){let R=m.array;T=m.version;for(let P=0,S=R.length;P<S;P+=3){let A=R[P+0],w=R[P+1],L=R[P+2];h.push(A,w,w,L,L,A)}}else{let R=_.array;T=_.version;for(let P=0,S=R.length/3-1;P<S;P+=3){let A=P+0,w=P+1,L=P+2;h.push(A,w,w,L,L,A)}}let p=new(_.count>=65535?ys:vs)(h,1);p.version=T;let f=r.get(g);f&&t.remove(f),r.set(g,p)}function u(g){let h=r.get(g);if(h){let m=g.index;m!==null&&h.version<m.version&&l(g)}else l(g);return r.get(g)}return{get:o,update:c,getWireframeAttribute:u}}function gp(i,t,e){let n;function s(g){n=g}let r,a;function o(g){r=g.type,a=g.bytesPerElement}function c(g,h){i.drawElements(n,h,r,g*a),e.update(h,n,1)}function l(g,h,m){m!==0&&(i.drawElementsInstanced(n,h,r,g*a,m),e.update(h,n,m))}function u(g,h,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,r,g,0,m);let T=0;for(let p=0;p<m;p++)T+=h[p];e.update(T,n,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function _p(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:qt("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function xp(i,t,e){let n=new WeakMap,s=new xe;function r(a,o,c){let l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,g=u!==void 0?u.length:0,h=n.get(o);if(h===void 0||h.count!==g){let C=function(){L.dispose(),n.delete(o),o.removeEventListener("dispose",C)};h!==void 0&&h.texture.dispose();let m=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,T=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],R=o.morphAttributes.color||[],P=0;m===!0&&(P=1),_===!0&&(P=2),T===!0&&(P=3);let S=o.attributes.position.count*P,A=1;S>t.maxTextureSize&&(A=Math.ceil(S/t.maxTextureSize),S=t.maxTextureSize);let w=new Float32Array(S*A*4*g),L=new _s(w,S,A,g);L.type=qe,L.needsUpdate=!0;let x=P*4;for(let F=0;F<g;F++){let q=p[F],O=f[F],Z=R[F],D=S*A*4*F;for(let H=0;H<q.count;H++){let et=H*x;m===!0&&(s.fromBufferAttribute(q,H),w[D+et+0]=s.x,w[D+et+1]=s.y,w[D+et+2]=s.z,w[D+et+3]=0),_===!0&&(s.fromBufferAttribute(O,H),w[D+et+4]=s.x,w[D+et+5]=s.y,w[D+et+6]=s.z,w[D+et+7]=0),T===!0&&(s.fromBufferAttribute(Z,H),w[D+et+8]=s.x,w[D+et+9]=s.y,w[D+et+10]=s.z,w[D+et+11]=Z.itemSize===4?s.w:1)}}h={count:g,texture:L,size:new Qt(S,A)},n.set(o,h),o.addEventListener("dispose",C)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let m=0;for(let T=0;T<l.length;T++)m+=l[T];let _=o.morphTargetsRelative?1:1-m;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",h.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function vp(i,t,e,n,s){let r=new WeakMap;function a(l){let u=s.render.frame,g=l.geometry,h=t.get(l,g);if(r.get(h)!==u&&(t.update(h),r.set(h,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==u&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){let m=l.skeleton;r.get(m)!==u&&(m.update(),r.set(m,u))}return h}function o(){r=new WeakMap}function c(l){let u=l.target;u.removeEventListener("dispose",c),n.releaseStatesOfObject(u),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:a,dispose:o}}var yp={[To]:"LINEAR_TONE_MAPPING",[wo]:"REINHARD_TONE_MAPPING",[Ao]:"CINEON_TONE_MAPPING",[Co]:"ACES_FILMIC_TONE_MAPPING",[Io]:"AGX_TONE_MAPPING",[Po]:"NEUTRAL_TONE_MAPPING",[Ro]:"CUSTOM_TONE_MAPPING"};function Mp(i,t,e,n,s,r){let a=new Ae(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,c=null,l=new Xe;l.setAttribute("position",new rn([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new rn([0,2,0,0,2,0],2));let u=new ni({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),g=new Be(l,u),h=new bi(-1,1,1,-1,0,1),m=null,_=null,T=!1,p,f=null,R=[],P=!1;this.setSize=function(S,A){a.setSize(S,A),o!==null&&o.setSize(S,A),c!==null&&c.setSize(S,A);for(let w=0;w<R.length;w++){let L=R[w];L.setSize&&L.setSize(S,A)}},this.setEffects=function(S){R=S,P=R.length>0&&R[0].isRenderPass===!0;let A=a.width,w=a.height;R.length>0&&o===null&&(o=new Ae(A,w,{type:tn,depthBuffer:!1,stencilBuffer:!1}),c=new Ae(A,w,{type:tn,depthBuffer:!1,stencilBuffer:!1}));for(let L=0;L<R.length;L++){let x=R[L];x.setSize&&x.setSize(A,w)}},this.begin=function(S,A){if(T||S.toneMapping===mn&&R.length===0)return!1;if(f=A,A!==null){let w=A.width,L=A.height;(a.width!==w||a.height!==L)&&this.setSize(w,L)}return P===!1&&S.setRenderTarget(a),p=S.toneMapping,S.toneMapping=mn,!0},this.hasRenderPass=function(){return P},this.end=function(S,A){S.toneMapping=p,T=!0;let w=a,L=o;for(let x=0;x<R.length;x++){let C=R[x];C.enabled!==!1&&(C.render(S,L,w,A),C.needsSwap!==!1&&(w=L,L=L===o?c:o))}if(m!==S.outputColorSpace||_!==S.toneMapping){m=S.outputColorSpace,_=S.toneMapping,u.defines={},ee.getTransfer(m)===ue&&(u.defines.SRGB_TRANSFER="");let x=yp[_];x&&(u.defines[x]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=w.texture,S.setRenderTarget(f),S.render(g,h),f=null,T=!1},this.isCompositing=function(){return T},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var rh=new We,sc=new ei(1,1),ah=new _s,oh=new Tr,ch=new bs,kl=[],Vl=[],Gl=new Float32Array(16),Hl=new Float32Array(9),Wl=new Float32Array(4);function as(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=kl[s];if(r===void 0&&(r=new Float32Array(s),kl[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function Ce(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Re(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Oa(i,t){let e=Vl[t];e===void 0&&(e=new Int32Array(t),Vl[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Sp(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function bp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;i.uniform2fv(this.addr,t),Re(e,t)}}function Ep(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ce(e,t))return;i.uniform3fv(this.addr,t),Re(e,t)}}function Tp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;i.uniform4fv(this.addr,t),Re(e,t)}}function wp(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ce(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Re(e,t)}else{if(Ce(e,n))return;Wl.set(n),i.uniformMatrix2fv(this.addr,!1,Wl),Re(e,n)}}function Ap(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ce(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Re(e,t)}else{if(Ce(e,n))return;Hl.set(n),i.uniformMatrix3fv(this.addr,!1,Hl),Re(e,n)}}function Cp(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ce(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Re(e,t)}else{if(Ce(e,n))return;Gl.set(n),i.uniformMatrix4fv(this.addr,!1,Gl),Re(e,n)}}function Rp(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Ip(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;i.uniform2iv(this.addr,t),Re(e,t)}}function Pp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ce(e,t))return;i.uniform3iv(this.addr,t),Re(e,t)}}function Lp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;i.uniform4iv(this.addr,t),Re(e,t)}}function Dp(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Np(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;i.uniform2uiv(this.addr,t),Re(e,t)}}function Up(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ce(e,t))return;i.uniform3uiv(this.addr,t),Re(e,t)}}function Fp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;i.uniform4uiv(this.addr,t),Re(e,t)}}function Op(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(sc.compareFunction=e.isReversedDepthBuffer()?Ia:Ra,r=sc):r=rh,e.setTexture2D(t||r,s)}function Bp(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||oh,s)}function zp(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||ch,s)}function kp(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||ah,s)}function Vp(i){switch(i){case 5126:return Sp;case 35664:return bp;case 35665:return Ep;case 35666:return Tp;case 35674:return wp;case 35675:return Ap;case 35676:return Cp;case 5124:case 35670:return Rp;case 35667:case 35671:return Ip;case 35668:case 35672:return Pp;case 35669:case 35673:return Lp;case 5125:return Dp;case 36294:return Np;case 36295:return Up;case 36296:return Fp;case 35678:case 36198:case 36298:case 36306:case 35682:return Op;case 35679:case 36299:case 36307:return Bp;case 35680:case 36300:case 36308:case 36293:return zp;case 36289:case 36303:case 36311:case 36292:return kp}}function Gp(i,t){i.uniform1fv(this.addr,t)}function Hp(i,t){let e=as(t,this.size,2);i.uniform2fv(this.addr,e)}function Wp(i,t){let e=as(t,this.size,3);i.uniform3fv(this.addr,e)}function Xp(i,t){let e=as(t,this.size,4);i.uniform4fv(this.addr,e)}function qp(i,t){let e=as(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Yp(i,t){let e=as(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Zp(i,t){let e=as(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function $p(i,t){i.uniform1iv(this.addr,t)}function Jp(i,t){i.uniform2iv(this.addr,t)}function Kp(i,t){i.uniform3iv(this.addr,t)}function Qp(i,t){i.uniform4iv(this.addr,t)}function jp(i,t){i.uniform1uiv(this.addr,t)}function t0(i,t){i.uniform2uiv(this.addr,t)}function e0(i,t){i.uniform3uiv(this.addr,t)}function n0(i,t){i.uniform4uiv(this.addr,t)}function i0(i,t,e){let n=this.cache,s=t.length,r=Oa(e,s);Ce(n,r)||(i.uniform1iv(this.addr,r),Re(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=sc:a=rh;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function s0(i,t,e){let n=this.cache,s=t.length,r=Oa(e,s);Ce(n,r)||(i.uniform1iv(this.addr,r),Re(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||oh,r[a])}function r0(i,t,e){let n=this.cache,s=t.length,r=Oa(e,s);Ce(n,r)||(i.uniform1iv(this.addr,r),Re(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||ch,r[a])}function a0(i,t,e){let n=this.cache,s=t.length,r=Oa(e,s);Ce(n,r)||(i.uniform1iv(this.addr,r),Re(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||ah,r[a])}function o0(i){switch(i){case 5126:return Gp;case 35664:return Hp;case 35665:return Wp;case 35666:return Xp;case 35674:return qp;case 35675:return Yp;case 35676:return Zp;case 5124:case 35670:return $p;case 35667:case 35671:return Jp;case 35668:case 35672:return Kp;case 35669:case 35673:return Qp;case 5125:return jp;case 36294:return t0;case 36295:return e0;case 36296:return n0;case 35678:case 36198:case 36298:case 36306:case 35682:return i0;case 35679:case 36299:case 36307:return s0;case 35680:case 36300:case 36308:case 36293:return r0;case 36289:case 36303:case 36311:case 36292:return a0}}var rc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Vp(e.type)}},ac=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=o0(e.type)}},oc=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],n)}}},nc=/(\w+)(\])?(\[|\.)?/g;function Xl(i,t){i.seq.push(t),i.map[t.id]=t}function c0(i,t,e){let n=i.name,s=n.length;for(nc.lastIndex=0;;){let r=nc.exec(n),a=nc.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){Xl(e,l===void 0?new rc(o,i,t):new ac(o,i,t));break}else{let g=e.map[o];g===void 0&&(g=new oc(o),Xl(e,g)),e=g}}}var rs=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=t.getActiveUniform(e,a),c=t.getUniformLocation(e,o.name);c0(o,c,this)}let s=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&n.push(a)}return n}};function ql(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var l0=37297,h0=0;function u0(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}var Yl=new Zt;function d0(i){ee._getMatrix(Yl,ee.workingColorSpace,i);let t=`mat3( ${Yl.elements.map(e=>e.toFixed(4))} )`;switch(ee.getTransfer(i)){case ps:return[t,"LinearTransferOETF"];case ue:return[t,"sRGBTransferOETF"];default:return Wt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Zl(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+u0(i.getShaderSource(t),o)}else return r}function f0(i,t){let e=d0(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var p0={[To]:"Linear",[wo]:"Reinhard",[Ao]:"Cineon",[Co]:"ACESFilmic",[Io]:"AgX",[Po]:"Neutral",[Ro]:"Custom"};function m0(i,t){let e=p0[t];return e===void 0?(Wt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var La=new tt;function g0(){ee.getLuminanceCoefficients(La);let i=La.x.toFixed(4),t=La.y.toFixed(4),e=La.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function _0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Vs).join(`
`)}function x0(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function v0(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Vs(i){return i!==""}function $l(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Jl(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var y0=/^[ \t]*#include +<([\w\d./]+)>/gm;function cc(i){return i.replace(y0,S0)}var M0=new Map;function S0(i,t){let e=jt[t];if(e===void 0){let n=M0.get(t);if(n!==void 0)e=jt[n],Wt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return cc(e)}var b0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Kl(i){return i.replace(b0,E0)}function E0(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Ql(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var T0={[Rs]:"SHADOWMAP_TYPE_PCF",[ji]:"SHADOWMAP_TYPE_VSM"};function w0(i){return T0[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var A0={[oi]:"ENVMAP_TYPE_CUBE",[Ti]:"ENVMAP_TYPE_CUBE",[Is]:"ENVMAP_TYPE_CUBE_UV"};function C0(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":A0[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var R0={[Ti]:"ENVMAP_MODE_REFRACTION"};function I0(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":R0[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var P0={[Eo]:"ENVMAP_BLENDING_MULTIPLY",[ml]:"ENVMAP_BLENDING_MIX",[gl]:"ENVMAP_BLENDING_ADD"};function L0(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":P0[i.combine]||"ENVMAP_BLENDING_NONE"}function D0(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function N0(i,t,e,n){let s=i.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,c=w0(e),l=C0(e),u=I0(e),g=L0(e),h=D0(e),m=_0(e),_=x0(r),T=s.createProgram(),p,f,R=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Vs).join(`
`),p.length>0&&(p+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Vs).join(`
`),f.length>0&&(f+=`
`)):(p=[Ql(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Vs).join(`
`),f=[Ql(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+g:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==mn?"#define TONE_MAPPING":"",e.toneMapping!==mn?jt.tonemapping_pars_fragment:"",e.toneMapping!==mn?m0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",jt.colorspace_pars_fragment,f0("linearToOutputTexel",e.outputColorSpace),g0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Vs).join(`
`)),a=cc(a),a=$l(a,e),a=Jl(a,e),o=cc(o),o=$l(o,e),o=Jl(o,e),a=Kl(a),o=Kl(o),e.isRawShaderMaterial!==!0&&(R=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,f=["#define varying in",e.glslVersion===wi?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===wi?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let P=R+p+a,S=R+f+o,A=ql(s,s.VERTEX_SHADER,P),w=ql(s,s.FRAGMENT_SHADER,S);s.attachShader(T,A),s.attachShader(T,w),e.index0AttributeName!==void 0?s.bindAttribLocation(T,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(T,0,"position"),s.linkProgram(T);function L(q){if(i.debug.checkShaderErrors){let O=s.getProgramInfoLog(T)||"",Z=s.getShaderInfoLog(A)||"",D=s.getShaderInfoLog(w)||"",H=O.trim(),et=Z.trim(),k=D.trim(),ct=!0,ot=!0;if(s.getProgramParameter(T,s.LINK_STATUS)===!1)if(ct=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,T,A,w);else{let j=Zl(s,A,"vertex"),rt=Zl(s,w,"fragment");qt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(T,s.VALIDATE_STATUS)+`

Material Name: `+q.name+`
Material Type: `+q.type+`

Program Info Log: `+H+`
`+j+`
`+rt)}else H!==""?Wt("WebGLProgram: Program Info Log:",H):(et===""||k==="")&&(ot=!1);ot&&(q.diagnostics={runnable:ct,programLog:H,vertexShader:{log:et,prefix:p},fragmentShader:{log:k,prefix:f}})}s.deleteShader(A),s.deleteShader(w),x=new rs(s,T),C=v0(s,T)}let x;this.getUniforms=function(){return x===void 0&&L(this),x};let C;this.getAttributes=function(){return C===void 0&&L(this),C};let F=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return F===!1&&(F=s.getProgramParameter(T,l0)),F},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(T),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=h0++,this.cacheKey=t,this.usedTimes=1,this.program=T,this.vertexShader=A,this.fragmentShader=w,this}var U0=0,lc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new hc(t),e.set(t,n)),n}},hc=class{constructor(t){this.id=U0++,this.code=t,this.usedTimes=0}};function F0(i){return i===hi||i===Fs||i===Os}function O0(i,t,e,n,s,r){let a=new xs,o=new lc,c=new Set,l=[],u=new Map,g=n.logarithmicDepthBuffer,h=n.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(x){return c.add(x),x===0?"uv":`uv${x}`}function T(x,C,F,q,O,Z){let D=q.fog,H=O.geometry,et=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?q.environment:null,k=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,ct=t.get(x.envMap||et,k),ot=ct&&ct.mapping===Is?ct.image.height:null,j=m[x.type];x.precision!==null&&(h=n.getMaxPrecision(x.precision),h!==x.precision&&Wt("WebGLProgram.getParameters:",x.precision,"not supported, using",h,"instead."));let rt=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,It=rt!==void 0?rt.length:0,Pt=0;H.morphAttributes.position!==void 0&&(Pt=1),H.morphAttributes.normal!==void 0&&(Pt=2),H.morphAttributes.color!==void 0&&(Pt=3);let ie,Vt,Jt,it;if(j){let pe=An[j];ie=pe.vertexShader,Vt=pe.fragmentShader}else{ie=x.vertexShader,Vt=x.fragmentShader;let pe=o.getVertexShaderStage(x),le=o.getFragmentShaderStage(x);o.update(x,pe,le),Jt=pe.id,it=le.id}let ht=i.getRenderTarget(),At=i.state.buffers.depth.getReversed(),Gt=O.isInstancedMesh===!0,Et=O.isBatchedMesh===!0,Xt=!!x.map,ce=!!x.matcap,Ht=!!ct,$t=!!x.aoMap,nt=!!x.lightMap,y=!!x.bumpMap&&x.wireframe===!1,I=!!x.normalMap,z=!!x.displacementMap,$=!!x.emissiveMap,W=!!x.metalnessMap,at=!!x.roughnessMap,b=x.anisotropy>0,_t=x.clearcoat>0,pt=x.dispersion>0,M=x.retroreflectivity>0,d=x.iridescence>0,U=x.sheen>0,X=x.transmission>0,J=b&&!!x.anisotropyMap,mt=_t&&!!x.clearcoatMap,B=_t&&!!x.clearcoatNormalMap,V=_t&&!!x.clearcoatRoughnessMap,Y=d&&!!x.iridescenceMap,ft=d&&!!x.iridescenceThicknessMap,xt=U&&!!x.sheenColorMap,lt=U&&!!x.sheenRoughnessMap,dt=!!x.specularMap,vt=!!x.specularColorMap,St=!!x.specularIntensityMap,kt=X&&!!x.transmissionMap,N=X&&!!x.thicknessMap,Mt=!!x.gradientMap,ut=!!x.alphaMap,yt=x.alphaTest>0,bt=!!x.alphaHash,gt=!!x.extensions,zt=mn;x.toneMapped&&(ht===null||ht.isXRRenderTarget===!0)&&(zt=i.toneMapping);let Ot={shaderID:j,shaderType:x.type,shaderName:x.name,vertexShader:ie,fragmentShader:Vt,defines:x.defines,customVertexShaderID:Jt,customFragmentShaderID:it,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:h,batching:Et,batchingColor:Et&&O._colorsTexture!==null,instancing:Gt,instancingColor:Gt&&O.instanceColor!==null,instancingMorph:Gt&&O.morphTexture!==null,outputColorSpace:ht===null?i.outputColorSpace:ht.isXRRenderTarget===!0?ht.texture.colorSpace:ee.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Xt,matcap:ce,envMap:Ht,envMapMode:Ht&&ct.mapping,envMapCubeUVHeight:ot,aoMap:$t,lightMap:nt,bumpMap:y,normalMap:I,displacementMap:z,emissiveMap:$,normalMapObjectSpace:I&&x.normalMapType===vl,normalMapTangentSpace:I&&x.normalMapType===ko,packedNormalMap:I&&x.normalMapType===ko&&F0(x.normalMap.format),metalnessMap:W,roughnessMap:at,anisotropy:b,anisotropyMap:J,clearcoat:_t,clearcoatMap:mt,clearcoatNormalMap:B,clearcoatRoughnessMap:V,dispersion:pt,retroreflection:M,iridescence:d,iridescenceMap:Y,iridescenceThicknessMap:ft,sheen:U,sheenColorMap:xt,sheenRoughnessMap:lt,specularMap:dt,specularColorMap:vt,specularIntensityMap:St,transmission:X,transmissionMap:kt,thicknessMap:N,gradientMap:Mt,opaque:x.transparent===!1&&x.blending===ts&&x.alphaToCoverage===!1,alphaMap:ut,alphaTest:yt,alphaHash:bt,combine:x.combine,mapUv:Xt&&_(x.map.channel),aoMapUv:$t&&_(x.aoMap.channel),lightMapUv:nt&&_(x.lightMap.channel),bumpMapUv:y&&_(x.bumpMap.channel),normalMapUv:I&&_(x.normalMap.channel),displacementMapUv:z&&_(x.displacementMap.channel),emissiveMapUv:$&&_(x.emissiveMap.channel),metalnessMapUv:W&&_(x.metalnessMap.channel),roughnessMapUv:at&&_(x.roughnessMap.channel),anisotropyMapUv:J&&_(x.anisotropyMap.channel),clearcoatMapUv:mt&&_(x.clearcoatMap.channel),clearcoatNormalMapUv:B&&_(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:V&&_(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Y&&_(x.iridescenceMap.channel),iridescenceThicknessMapUv:ft&&_(x.iridescenceThicknessMap.channel),sheenColorMapUv:xt&&_(x.sheenColorMap.channel),sheenRoughnessMapUv:lt&&_(x.sheenRoughnessMap.channel),specularMapUv:dt&&_(x.specularMap.channel),specularColorMapUv:vt&&_(x.specularColorMap.channel),specularIntensityMapUv:St&&_(x.specularIntensityMap.channel),transmissionMapUv:kt&&_(x.transmissionMap.channel),thicknessMapUv:N&&_(x.thicknessMap.channel),alphaMapUv:ut&&_(x.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(I||b),vertexNormals:!!H.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!H.attributes.uv&&(Xt||ut),fog:!!D,useFog:x.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||H.attributes.normal===void 0&&I===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:g,reversedDepthBuffer:At,skinning:O.isSkinnedMesh===!0,hasPositionAttribute:H.attributes.position!==void 0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:It,morphTextureStride:Pt,numSunLights:C.sun.length,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numSunLightShadows:C.sunShadowMap.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numLightProbeGrids:Z.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&F.length>0,shadowMapType:i.shadowMap.type,toneMapping:zt,decodeVideoTexture:Xt&&x.map.isVideoTexture===!0&&ee.getTransfer(x.map.colorSpace)===ue,decodeVideoTextureEmissive:$&&x.emissiveMap.isVideoTexture===!0&&ee.getTransfer(x.emissiveMap.colorSpace)===ue,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===on,flipSided:x.side===Ge,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:gt&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(gt&&x.extensions.multiDraw===!0||Et)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Ot.vertexUv1s=c.has(1),Ot.vertexUv2s=c.has(2),Ot.vertexUv3s=c.has(3),c.clear(),Ot}function p(x){let C=[];if(x.shaderID?C.push(x.shaderID):(C.push(x.customVertexShaderID),C.push(x.customFragmentShaderID)),x.defines!==void 0)for(let F in x.defines)C.push(F),C.push(x.defines[F]);return x.isRawShaderMaterial===!1&&(f(C,x),R(C,x),C.push(i.outputColorSpace)),C.push(x.customProgramCacheKey),C.join()}function f(x,C){x.push(C.precision),x.push(C.outputColorSpace),x.push(C.envMapMode),x.push(C.envMapCubeUVHeight),x.push(C.mapUv),x.push(C.alphaMapUv),x.push(C.lightMapUv),x.push(C.aoMapUv),x.push(C.bumpMapUv),x.push(C.normalMapUv),x.push(C.displacementMapUv),x.push(C.emissiveMapUv),x.push(C.metalnessMapUv),x.push(C.roughnessMapUv),x.push(C.anisotropyMapUv),x.push(C.clearcoatMapUv),x.push(C.clearcoatNormalMapUv),x.push(C.clearcoatRoughnessMapUv),x.push(C.iridescenceMapUv),x.push(C.iridescenceThicknessMapUv),x.push(C.sheenColorMapUv),x.push(C.sheenRoughnessMapUv),x.push(C.specularMapUv),x.push(C.specularColorMapUv),x.push(C.specularIntensityMapUv),x.push(C.transmissionMapUv),x.push(C.thicknessMapUv),x.push(C.combine),x.push(C.fogExp2),x.push(C.sizeAttenuation),x.push(C.morphTargetsCount),x.push(C.morphAttributeCount),x.push(C.numSunLights),x.push(C.numDirLights),x.push(C.numPointLights),x.push(C.numSpotLights),x.push(C.numSpotLightMaps),x.push(C.numHemiLights),x.push(C.numRectAreaLights),x.push(C.numSunLightShadows),x.push(C.numDirLightShadows),x.push(C.numPointLightShadows),x.push(C.numSpotLightShadows),x.push(C.numSpotLightShadowsWithMaps),x.push(C.numLightProbes),x.push(C.shadowMapType),x.push(C.toneMapping),x.push(C.numClippingPlanes),x.push(C.numClipIntersection),x.push(C.depthPacking)}function R(x,C){a.disableAll(),C.instancing&&a.enable(0),C.instancingColor&&a.enable(1),C.instancingMorph&&a.enable(2),C.matcap&&a.enable(3),C.envMap&&a.enable(4),C.normalMapObjectSpace&&a.enable(5),C.normalMapTangentSpace&&a.enable(6),C.clearcoat&&a.enable(7),C.iridescence&&a.enable(8),C.alphaTest&&a.enable(9),C.vertexColors&&a.enable(10),C.vertexAlphas&&a.enable(11),C.vertexUv1s&&a.enable(12),C.vertexUv2s&&a.enable(13),C.vertexUv3s&&a.enable(14),C.vertexTangents&&a.enable(15),C.anisotropy&&a.enable(16),C.alphaHash&&a.enable(17),C.batching&&a.enable(18),C.dispersion&&a.enable(19),C.retroreflection&&a.enable(24),C.batchingColor&&a.enable(20),C.gradientMap&&a.enable(21),C.packedNormalMap&&a.enable(22),C.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),C.fog&&a.enable(0),C.useFog&&a.enable(1),C.flatShading&&a.enable(2),C.logarithmicDepthBuffer&&a.enable(3),C.reversedDepthBuffer&&a.enable(4),C.skinning&&a.enable(5),C.morphTargets&&a.enable(6),C.morphNormals&&a.enable(7),C.morphColors&&a.enable(8),C.premultipliedAlpha&&a.enable(9),C.shadowMapEnabled&&a.enable(10),C.doubleSided&&a.enable(11),C.flipSided&&a.enable(12),C.useDepthPacking&&a.enable(13),C.dithering&&a.enable(14),C.transmission&&a.enable(15),C.sheen&&a.enable(16),C.opaque&&a.enable(17),C.pointsUvs&&a.enable(18),C.decodeVideoTexture&&a.enable(19),C.decodeVideoTextureEmissive&&a.enable(20),C.alphaToCoverage&&a.enable(21),C.numLightProbeGrids>0&&a.enable(22),C.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function P(x){let C=m[x.type],F;if(C){let q=An[C];F=Dl.clone(q.uniforms)}else F=x.uniforms;return F}function S(x,C){let F=u.get(C);return F!==void 0?++F.usedTimes:(F=new N0(i,C,x,s),l.push(F),u.set(C,F)),F}function A(x){if(--x.usedTimes===0){let C=l.indexOf(x);l[C]=l[l.length-1],l.pop(),u.delete(x.cacheKey),x.destroy()}}function w(x){o.remove(x)}function L(){o.dispose()}return{getParameters:T,getProgramCacheKey:p,getUniforms:P,acquireProgram:S,releaseProgram:A,releaseShaderCache:w,programs:l,dispose:L}}function B0(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function z0(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function jl(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function th(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(h){let m=0;return h.isInstancedMesh&&(m+=2),h.isSkinnedMesh&&(m+=1),m}function o(h,m,_,T,p,f){let R=i[t];return R===void 0?(R={id:h.id,object:h,geometry:m,material:_,materialVariant:a(h),groupOrder:T,renderOrder:h.renderOrder,z:p,group:f},i[t]=R):(R.id=h.id,R.object=h,R.geometry=m,R.material=_,R.materialVariant=a(h),R.groupOrder=T,R.renderOrder=h.renderOrder,R.z=p,R.group=f),t++,R}function c(h,m,_,T,p,f,R){R.reversedDepth===!0&&(p=-p);let P=o(h,m,_,T,p,f);_.transmission>0?n.push(P):_.transparent===!0?s.push(P):e.push(P)}function l(h,m,_,T,p,f){let R=o(h,m,_,T,p,f);_.transmission>0?n.unshift(R):_.transparent===!0?s.unshift(R):e.unshift(R)}function u(h,m){e.length>1&&e.sort(h||z0),n.length>1&&n.sort(m||jl),s.length>1&&s.sort(m||jl)}function g(){for(let h=t,m=i.length;h<m;h++){let _=i[h];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:g,sort:u}}function k0(){let i=new WeakMap;function t(n,s){let r=i.get(n),a;return r===void 0?(a=new th,i.set(n,[a])):s>=r.length?(a=new th,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function V0(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new tt,color:new oe};break;case"SpotLight":e={position:new tt,direction:new tt,color:new oe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new tt,color:new oe,distance:0,decay:0};break;case"HemisphereLight":e={direction:new tt,skyColor:new oe,groundColor:new oe};break;case"RectAreaLight":e={color:new oe,position:new tt,halfWidth:new tt,halfHeight:new tt};break}return i[t.id]=e,e}}}function G0(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var H0=0;function W0(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function X0(i){let t=new V0,e=G0(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new tt);let s=new tt,r=new Me,a=new Me;function o(l){let u=0,g=0,h=0;for(let O=0;O<9;O++)n.probe[O].set(0,0,0);let m=0,_=0,T=0,p=0,f=0,R=0,P=0,S=0,A=0,w=0,L=0,x=0,C=0,F=0;l.sort(W0);for(let O=0,Z=l.length;O<Z;O++){let D=l[O],H=D.color,et=D.intensity,k=D.distance,ct=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===hi?ct=D.shadow.map.texture:ct=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)u+=H.r*et,g+=H.g*et,h+=H.b*et;else if(D.isLightProbe){for(let ot=0;ot<9;ot++)n.probe[ot].addScaledVector(D.sh.coefficients[ot],et);F++}else if(D.isSunLight){let ot=t.get(D);if(ot.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let j=D.shadow,rt=e.get(D);rt.shadowIntensity=j.intensity,rt.shadowBias=j.bias,rt.shadowNormalBias=j.normalBias,rt.shadowRadius=j.radius,rt.shadowMapSize.copy(j.mapSize).multiply(j.getFrameExtents()),n.sunShadow[_]=rt,n.sunShadowMap[_]=ct;let It=j.getViewportCount();for(let Pt=0;Pt<It;Pt++)n.sunShadowMatrix[T+Pt]=j.getMatrix(Pt),n.sunShadowCascade[T+Pt]=j._cascadeData[Pt];T+=It,_++}n.sun[m]=ot,m++}else if(D.isDirectionalLight){let ot=t.get(D);if(ot.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let j=D.shadow,rt=e.get(D);rt.shadowIntensity=j.intensity,rt.shadowBias=j.bias,rt.shadowNormalBias=j.normalBias,rt.shadowRadius=j.radius,rt.shadowMapSize=j.mapSize,n.directionalShadow[p]=rt,n.directionalShadowMap[p]=ct,n.directionalShadowMatrix[p]=D.shadow.matrix,A++}n.directional[p]=ot,p++}else if(D.isSpotLight){let ot=t.get(D);ot.position.setFromMatrixPosition(D.matrixWorld),ot.color.copy(H).multiplyScalar(et),ot.distance=k,ot.coneCos=Math.cos(D.angle),ot.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),ot.decay=D.decay,n.spot[R]=ot;let j=D.shadow;if(D.map&&(n.spotLightMap[x]=D.map,x++,j.updateMatrices(D),D.castShadow&&C++),n.spotLightMatrix[R]=j.matrix,D.castShadow){let rt=e.get(D);rt.shadowIntensity=j.intensity,rt.shadowBias=j.bias,rt.shadowNormalBias=j.normalBias,rt.shadowRadius=j.radius,rt.shadowMapSize=j.mapSize,n.spotShadow[R]=rt,n.spotShadowMap[R]=ct,L++}R++}else if(D.isRectAreaLight){let ot=t.get(D);ot.color.copy(H).multiplyScalar(et),ot.halfWidth.set(D.width*.5,0,0),ot.halfHeight.set(0,D.height*.5,0),n.rectArea[P]=ot,P++}else if(D.isPointLight){let ot=t.get(D);if(ot.color.copy(D.color).multiplyScalar(D.intensity),ot.distance=D.distance,ot.decay=D.decay,D.castShadow){let j=D.shadow,rt=e.get(D);rt.shadowIntensity=j.intensity,rt.shadowBias=j.bias,rt.shadowNormalBias=j.normalBias,rt.shadowRadius=j.radius,rt.shadowMapSize=j.mapSize,rt.shadowCameraNear=j.camera.near,rt.shadowCameraFar=j.camera.far,n.pointShadow[f]=rt,n.pointShadowMap[f]=ct,n.pointShadowMatrix[f]=D.shadow.matrix,w++}n.point[f]=ot,f++}else if(D.isHemisphereLight){let ot=t.get(D);ot.skyColor.copy(D.color).multiplyScalar(et),ot.groundColor.copy(D.groundColor).multiplyScalar(et),n.hemi[S]=ot,S++}}P>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Tt.LTC_FLOAT_1,n.rectAreaLTC2=Tt.LTC_FLOAT_2):(n.rectAreaLTC1=Tt.LTC_HALF_1,n.rectAreaLTC2=Tt.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=g,n.ambient[2]=h;let q=n.hash;(q.sunLength!==m||q.directionalLength!==p||q.pointLength!==f||q.spotLength!==R||q.rectAreaLength!==P||q.hemiLength!==S||q.numSunShadows!==_||q.numDirectionalShadows!==A||q.numPointShadows!==w||q.numSpotShadows!==L||q.numSpotMaps!==x||q.numLightProbes!==F)&&(n.sun.length=m,n.directional.length=p,n.spot.length=R,n.rectArea.length=P,n.point.length=f,n.hemi.length=S,n.sunShadow.length=_,n.sunShadowMap.length=_,n.sunShadowMatrix.length=T,n.sunShadowCascade.length=T,n.directionalShadow.length=A,n.directionalShadowMap.length=A,n.directionalShadowMatrix.length=A,n.pointShadow.length=w,n.pointShadowMap.length=w,n.pointShadowMatrix.length=w,n.spotShadow.length=L,n.spotShadowMap.length=L,n.spotLightMatrix.length=L+x-C,n.spotLightMap.length=x,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=F,q.sunLength=m,q.directionalLength=p,q.pointLength=f,q.spotLength=R,q.rectAreaLength=P,q.hemiLength=S,q.numSunShadows=_,q.numDirectionalShadows=A,q.numPointShadows=w,q.numSpotShadows=L,q.numSpotMaps=x,q.numLightProbes=F,n.version=H0++)}function c(l,u){let g=0,h=0,m=0,_=0,T=0,p=0,f=u.matrixWorldInverse;for(let R=0,P=l.length;R<P;R++){let S=l[R];if(S.isSunLight){let A=n.sun[g];A.direction.setFromMatrixPosition(S.matrixWorld),A.direction.transformDirection(f),g++}else if(S.isDirectionalLight){let A=n.directional[h];A.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(f),h++}else if(S.isSpotLight){let A=n.spot[_];A.position.setFromMatrixPosition(S.matrixWorld),A.position.applyMatrix4(f),A.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(f),_++}else if(S.isRectAreaLight){let A=n.rectArea[T];A.position.setFromMatrixPosition(S.matrixWorld),A.position.applyMatrix4(f),a.identity(),r.copy(S.matrixWorld),r.premultiply(f),a.extractRotation(r),A.halfWidth.set(S.width*.5,0,0),A.halfHeight.set(0,S.height*.5,0),A.halfWidth.applyMatrix4(a),A.halfHeight.applyMatrix4(a),T++}else if(S.isPointLight){let A=n.point[m];A.position.setFromMatrixPosition(S.matrixWorld),A.position.applyMatrix4(f),m++}else if(S.isHemisphereLight){let A=n.hemi[p];A.direction.setFromMatrixPosition(S.matrixWorld),A.direction.transformDirection(f),p++}}}return{setup:o,setupView:c,state:n}}function eh(i){let t=new X0(i),e=[],n=[],s=[];function r(h){g.camera=h,e.length=0,n.length=0,s.length=0}function a(h){e.push(h)}function o(h){n.push(h)}function c(h){s.push(h)}function l(){t.setup(e)}function u(h){t.setupView(e,h)}let g={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:g,setupLights:l,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function q0(i){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new eh(i),t.set(s,[o])):r>=a.length?(o=new eh(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}var Y0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Z0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,$0=[new tt(1,0,0),new tt(-1,0,0),new tt(0,1,0),new tt(0,-1,0),new tt(0,0,1),new tt(0,0,-1)],J0=[new tt(0,-1,0),new tt(0,-1,0),new tt(0,0,1),new tt(0,0,-1),new tt(0,-1,0),new tt(0,-1,0)],nh=new Me,ks=new tt,ic=new tt;function K0(i,t,e){let n=new Ss,s=new Qt,r=new Qt,a=new xe,o=new Cr,c=new Rr,l={},u=e.maxTextureSize,g={[ai]:Ge,[Ge]:ai,[on]:on},h=new Ke({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Qt},radius:{value:4}},vertexShader:Y0,fragmentShader:Z0}),m=h.clone();m.defines.HORIZONTAL_PASS=1;let _=new Xe;_.setAttribute("position",new Pe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let T=new Be(_,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Rs;let f=this.type;this.render=function(w,L,x){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||w.length===0)return;this.type===Qc&&(Wt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Rs);let C=i.getRenderTarget(),F=i.getActiveCubeFace(),q=i.getActiveMipmapLevel(),O=i.state;O.setBlending(Tn),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);let Z=f!==this.type;Z&&L.traverse(function(D){D.material&&(Array.isArray(D.material)?D.material.forEach(H=>H.needsUpdate=!0):D.material.needsUpdate=!0)});for(let D=0,H=w.length;D<H;D++){let et=w[D],k=et.shadow;if(k===void 0){Wt("WebGLShadowMap:",et,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;s.copy(k.mapSize);let ct=k.getFrameExtents();s.multiply(ct),r.copy(k.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/ct.x),s.x=r.x*ct.x,k.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/ct.y),s.y=r.y*ct.y,k.mapSize.y=r.y));let ot=i.state.buffers.depth.getReversed();if(k.camera._reversedDepth=ot,k.map===null||Z===!0){if(k.map!==null&&(k.map.depthTexture!==null&&(k.map.depthTexture.dispose(),k.map.depthTexture=null),k.map.dispose()),this.type===ji){if(et.isPointLight){Wt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}k.map=new Ae(s.x,s.y,{format:hi,type:tn,minFilter:we,magFilter:we,generateMipmaps:!1}),k.map.texture.name=et.name+".shadowMap",k.map.depthTexture=new ei(s.x,s.y,qe),k.map.depthTexture.name=et.name+".shadowMapDepth",k.map.depthTexture.format=Sn,k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Te,k.map.depthTexture.magFilter=Te}else et.isPointLight?(k.map=new Na(s.x),k.map.depthTexture=new Ar(s.x,gn)):(k.map=new Ae(s.x,s.y),k.map.depthTexture=new ei(s.x,s.y,gn)),k.map.depthTexture.name=et.name+".shadowMap",k.map.depthTexture.format=Sn,this.type===Rs?(k.map.depthTexture.compareFunction=ot?Ia:Ra,k.map.depthTexture.minFilter=we,k.map.depthTexture.magFilter=we):(k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Te,k.map.depthTexture.magFilter=Te);k.camera.updateProjectionMatrix()}k.map.isWebGLCubeRenderTarget!==!0&&(k.map.width!==s.x||k.map.height!==s.y)&&k.map.setSize(s.x,s.y);let j=k.map.isWebGLCubeRenderTarget?6:k.getViewportCount();et.isPointLight!==!0&&k.updateMatrices(et,x);for(let rt=0;rt<j;rt++){let It=k.getCamera(rt);if(et.isPointLight){let Pt=k.camera,ie=k.matrix,Vt=et.distance||Pt.far;Vt!==Pt.far&&(Pt.far=Vt,Pt.updateProjectionMatrix()),ks.setFromMatrixPosition(et.matrixWorld),Pt.position.copy(ks),ic.copy(Pt.position),ic.add($0[rt]),Pt.up.copy(J0[rt]),Pt.lookAt(ic),Pt.updateMatrixWorld(),ie.makeTranslation(-ks.x,-ks.y,-ks.z),nh.multiplyMatrices(Pt.projectionMatrix,Pt.matrixWorldInverse),k._frustum.setFromProjectionMatrix(nh,Pt.coordinateSystem,Pt.reversedDepth)}if(k.map.isWebGLCubeRenderTarget)i.setRenderTarget(k.map,rt),i.clear();else{rt===0&&(i.setRenderTarget(k.map),i.clear());let Pt=k.getViewport(rt);a.set(r.x*Pt.x,r.y*Pt.y,r.x*Pt.z,r.y*Pt.w),O.viewport(a)}n=k.getFrustum(rt),S(L,x,It,et,this.type)}k.isPointLightShadow!==!0&&this.type===ji&&R(k,x),k.needsUpdate=!1}f=this.type,p.needsUpdate=!1,i.setRenderTarget(C,F,q)};function R(w,L){let x=t.update(T);h.defines.VSM_SAMPLES!==w.blurSamples&&(h.defines.VSM_SAMPLES=w.blurSamples,m.defines.VSM_SAMPLES=w.blurSamples,h.needsUpdate=!0,m.needsUpdate=!0),w.mapPass===null?w.mapPass=new Ae(s.x,s.y,{format:hi,type:tn}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),h.uniforms.shadow_pass.value=w.map.depthTexture,h.uniforms.resolution.value.set(w.map.width,w.map.height),h.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(L,null,x,h,T,null),m.uniforms.shadow_pass.value=w.mapPass.texture,m.uniforms.resolution.value.set(w.map.width,w.map.height),m.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(L,null,x,m,T,null)}function P(w,L,x,C){let F=null,q=x.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(q!==void 0)F=q;else if(F=x.isPointLight===!0?c:o,i.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){let O=F.uuid,Z=L.uuid,D=l[O];D===void 0&&(D={},l[O]=D);let H=D[Z];H===void 0&&(H=F.clone(),D[Z]=H,L.addEventListener("dispose",A)),F=H}if(F.visible=L.visible,F.wireframe=L.wireframe,C===ji?F.side=L.shadowSide!==null?L.shadowSide:L.side:F.side=L.shadowSide!==null?L.shadowSide:g[L.side],F.alphaMap=L.alphaMap,F.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,F.map=L.map,F.clipShadows=L.clipShadows,F.clippingPlanes=L.clippingPlanes,F.clipIntersection=L.clipIntersection,F.displacementMap=L.displacementMap,F.displacementScale=L.displacementScale,F.displacementBias=L.displacementBias,F.wireframeLinewidth=L.wireframeLinewidth,F.linewidth=L.linewidth,x.isPointLight===!0&&F.isMeshDistanceMaterial===!0){let O=i.properties.get(F);O.light=x}return F}function S(w,L,x,C,F){if(w.visible===!1)return;if(w.layers.test(L.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&F===ji)&&(!w.frustumCulled||w.intersectsFrustum(n))){w.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,w.matrixWorld);let Z=t.update(w),D=w.material;if(Array.isArray(D)){let H=Z.groups;for(let et=0,k=H.length;et<k;et++){let ct=H[et],ot=D[ct.materialIndex];if(ot&&ot.visible){let j=P(w,ot,C,F);w.onBeforeShadow(i,w,L,x,Z,j,ct),i.renderBufferDirect(x,null,Z,j,w,ct),w.onAfterShadow(i,w,L,x,Z,j,ct)}}}else if(D.visible){let H=P(w,D,C,F);w.onBeforeShadow(i,w,L,x,Z,H,null),i.renderBufferDirect(x,null,Z,H,w,null),w.onAfterShadow(i,w,L,x,Z,H,null)}}let O=w.children;for(let Z=0,D=O.length;Z<D;Z++)S(O[Z],L,x,C,F)}function A(w){w.target.removeEventListener("dispose",A);for(let x in l){let C=l[x],F=w.target.uuid;F in C&&(C[F].dispose(),delete C[F])}}}function Q0(i,t){function e(){let N=!1,Mt=new xe,ut=null,yt=new xe(0,0,0,0);return{setMask:function(bt){ut!==bt&&!N&&(i.colorMask(bt,bt,bt,bt),ut=bt)},setLocked:function(bt){N=bt},setClear:function(bt,gt,zt,Ot,pe){pe===!0&&(bt*=Ot,gt*=Ot,zt*=Ot),Mt.set(bt,gt,zt,Ot),yt.equals(Mt)===!1&&(i.clearColor(bt,gt,zt,Ot),yt.copy(Mt))},reset:function(){N=!1,ut=null,yt.set(-1,0,0,0)}}}function n(){let N=!1,Mt=!1,ut=null,yt=null,bt=null;return{setReversed:function(gt){if(Mt!==gt){let zt=t.get("EXT_clip_control");gt?zt.clipControlEXT(zt.LOWER_LEFT_EXT,zt.ZERO_TO_ONE_EXT):zt.clipControlEXT(zt.LOWER_LEFT_EXT,zt.NEGATIVE_ONE_TO_ONE_EXT),Mt=gt;let Ot=bt;bt=null,this.setClear(Ot)}},getReversed:function(){return Mt},setTest:function(gt){gt?ht(i.DEPTH_TEST):At(i.DEPTH_TEST)},setMask:function(gt){ut!==gt&&!N&&(i.depthMask(gt),ut=gt)},setFunc:function(gt){if(Mt&&(gt=Pl[gt]),yt!==gt){switch(gt){case dr:i.depthFunc(i.NEVER);break;case fr:i.depthFunc(i.ALWAYS);break;case pr:i.depthFunc(i.LESS);break;case qi:i.depthFunc(i.LEQUAL);break;case mr:i.depthFunc(i.EQUAL);break;case gr:i.depthFunc(i.GEQUAL);break;case _r:i.depthFunc(i.GREATER);break;case xr:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}yt=gt}},setLocked:function(gt){N=gt},setClear:function(gt){bt!==gt&&(bt=gt,Mt&&(gt=1-gt),i.clearDepth(gt))},reset:function(){N=!1,ut=null,yt=null,bt=null,Mt=!1}}}function s(){let N=!1,Mt=null,ut=null,yt=null,bt=null,gt=null,zt=null,Ot=null,pe=null;return{setTest:function(le){N||(le?ht(i.STENCIL_TEST):At(i.STENCIL_TEST))},setMask:function(le){Mt!==le&&!N&&(i.stencilMask(le),Mt=le)},setFunc:function(le,ln,xn){(ut!==le||yt!==ln||bt!==xn)&&(i.stencilFunc(le,ln,xn),ut=le,yt=ln,bt=xn)},setOp:function(le,ln,xn){(gt!==le||zt!==ln||Ot!==xn)&&(i.stencilOp(le,ln,xn),gt=le,zt=ln,Ot=xn)},setLocked:function(le){N=le},setClear:function(le){pe!==le&&(i.clearStencil(le),pe=le)},reset:function(){N=!1,Mt=null,ut=null,yt=null,bt=null,gt=null,zt=null,Ot=null,pe=null}}}let r=new e,a=new n,o=new s,c=new WeakMap,l=new WeakMap,u={},g={},h={},m=new WeakMap,_=[],T=null,p=!1,f=null,R=null,P=null,S=null,A=null,w=null,L=null,x=new oe(0,0,0),C=0,F=!1,q=null,O=null,Z=null,D=null,H=null,et=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),k=!1,ct=0,ot=i.getParameter(i.VERSION);ot.indexOf("WebGL")!==-1?(ct=parseFloat(/^WebGL (\d)/.exec(ot)[1]),k=ct>=1):ot.indexOf("OpenGL ES")!==-1&&(ct=parseFloat(/^OpenGL ES (\d)/.exec(ot)[1]),k=ct>=2);let j=null,rt={},It=i.getParameter(i.SCISSOR_BOX),Pt=i.getParameter(i.VIEWPORT),ie=new xe().fromArray(It),Vt=new xe().fromArray(Pt);function Jt(N,Mt,ut,yt){let bt=new Uint8Array(4),gt=i.createTexture();i.bindTexture(N,gt),i.texParameteri(N,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(N,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let zt=0;zt<ut;zt++)N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY?i.texImage3D(Mt,0,i.RGBA,1,1,yt,0,i.RGBA,i.UNSIGNED_BYTE,bt):i.texImage2D(Mt+zt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,bt);return gt}let it={};it[i.TEXTURE_2D]=Jt(i.TEXTURE_2D,i.TEXTURE_2D,1),it[i.TEXTURE_CUBE_MAP]=Jt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),it[i.TEXTURE_2D_ARRAY]=Jt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),it[i.TEXTURE_3D]=Jt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ht(i.DEPTH_TEST),a.setFunc(qi),y(!1),I(xo),ht(i.CULL_FACE),$t(Tn);function ht(N){u[N]!==!0&&(i.enable(N),u[N]=!0)}function At(N){u[N]!==!1&&(i.disable(N),u[N]=!1)}function Gt(N,Mt){return h[N]!==Mt?(i.bindFramebuffer(N,Mt),h[N]=Mt,N===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=Mt),N===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=Mt),!0):!1}function Et(N,Mt){let ut=_,yt=!1;if(N){ut=m.get(Mt),ut===void 0&&(ut=[],m.set(Mt,ut));let bt=N.textures;if(ut.length!==bt.length||ut[0]!==i.COLOR_ATTACHMENT0){for(let gt=0,zt=bt.length;gt<zt;gt++)ut[gt]=i.COLOR_ATTACHMENT0+gt;ut.length=bt.length,yt=!0}}else ut[0]!==i.BACK&&(ut[0]=i.BACK,yt=!0);yt&&i.drawBuffers(ut)}function Xt(N){return T!==N?(i.useProgram(N),T=N,!0):!1}let ce={[Bn]:i.FUNC_ADD,[jc]:i.FUNC_SUBTRACT,[tl]:i.FUNC_REVERSE_SUBTRACT};ce[el]=i.MIN,ce[nl]=i.MAX;let Ht={[il]:i.ZERO,[Ei]:i.ONE,[sl]:i.SRC_COLOR,[So]:i.SRC_ALPHA,[hl]:i.SRC_ALPHA_SATURATE,[cl]:i.DST_COLOR,[al]:i.DST_ALPHA,[rl]:i.ONE_MINUS_SRC_COLOR,[bo]:i.ONE_MINUS_SRC_ALPHA,[ll]:i.ONE_MINUS_DST_COLOR,[ol]:i.ONE_MINUS_DST_ALPHA,[ul]:i.CONSTANT_COLOR,[dl]:i.ONE_MINUS_CONSTANT_COLOR,[fl]:i.CONSTANT_ALPHA,[pl]:i.ONE_MINUS_CONSTANT_ALPHA};function $t(N,Mt,ut,yt,bt,gt,zt,Ot,pe,le){if(N===Tn){p===!0&&(At(i.BLEND),p=!1);return}if(p===!1&&(ht(i.BLEND),p=!0),N!==Hr){if(N!==f||le!==F){if((R!==Bn||A!==Bn)&&(i.blendEquation(i.FUNC_ADD),R=Bn,A=Bn),le)switch(N){case ts:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case vo:i.blendFunc(i.ONE,i.ONE);break;case yo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Mo:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:qt("WebGLState: Invalid blending: ",N);break}else switch(N){case ts:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case vo:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case yo:qt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Mo:qt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:qt("WebGLState: Invalid blending: ",N);break}P=null,S=null,w=null,L=null,x.set(0,0,0),C=0,f=N,F=le}return}bt=bt||Mt,gt=gt||ut,zt=zt||yt,(Mt!==R||bt!==A)&&(i.blendEquationSeparate(ce[Mt],ce[bt]),R=Mt,A=bt),(ut!==P||yt!==S||gt!==w||zt!==L)&&(i.blendFuncSeparate(Ht[ut],Ht[yt],Ht[gt],Ht[zt]),P=ut,S=yt,w=gt,L=zt),(Ot.equals(x)===!1||pe!==C)&&(i.blendColor(Ot.r,Ot.g,Ot.b,pe),x.copy(Ot),C=pe),f=N,F=!1}function nt(N,Mt){N.side===on?At(i.CULL_FACE):ht(i.CULL_FACE);let ut=N.side===Ge;Mt&&(ut=!ut),y(ut),N.blending===ts&&N.transparent===!1?$t(Tn):$t(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),a.setFunc(N.depthFunc),a.setTest(N.depthTest),a.setMask(N.depthWrite),r.setMask(N.colorWrite);let yt=N.stencilWrite;o.setTest(yt),yt&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),$(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?ht(i.SAMPLE_ALPHA_TO_COVERAGE):At(i.SAMPLE_ALPHA_TO_COVERAGE)}function y(N){q!==N&&(N?i.frontFace(i.CW):i.frontFace(i.CCW),q=N)}function I(N){N!==Jc?(ht(i.CULL_FACE),N!==O&&(N===xo?i.cullFace(i.BACK):N===Kc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):At(i.CULL_FACE),O=N}function z(N){N!==Z&&(k&&i.lineWidth(N),Z=N)}function $(N,Mt,ut){N?(ht(i.POLYGON_OFFSET_FILL),(D!==Mt||H!==ut)&&(D=Mt,H=ut,a.getReversed()&&(Mt=-Mt),i.polygonOffset(Mt,ut))):At(i.POLYGON_OFFSET_FILL)}function W(N){N?ht(i.SCISSOR_TEST):At(i.SCISSOR_TEST)}function at(N){N===void 0&&(N=i.TEXTURE0+et-1),j!==N&&(i.activeTexture(N),j=N)}function b(N,Mt,ut){ut===void 0&&(j===null?ut=i.TEXTURE0+et-1:ut=j);let yt=rt[ut];yt===void 0&&(yt={type:void 0,texture:void 0},rt[ut]=yt),(yt.type!==N||yt.texture!==Mt)&&(j!==ut&&(i.activeTexture(ut),j=ut),i.bindTexture(N,Mt||it[N]),yt.type=N,yt.texture=Mt)}function _t(){let N=rt[j];N!==void 0&&N.type!==void 0&&(i.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function pt(){try{i.compressedTexImage2D(...arguments)}catch(N){qt("WebGLState:",N)}}function M(){try{i.compressedTexImage3D(...arguments)}catch(N){qt("WebGLState:",N)}}function d(){try{i.texSubImage2D(...arguments)}catch(N){qt("WebGLState:",N)}}function U(){try{i.texSubImage3D(...arguments)}catch(N){qt("WebGLState:",N)}}function X(){try{i.compressedTexSubImage2D(...arguments)}catch(N){qt("WebGLState:",N)}}function J(){try{i.compressedTexSubImage3D(...arguments)}catch(N){qt("WebGLState:",N)}}function mt(){try{i.texStorage2D(...arguments)}catch(N){qt("WebGLState:",N)}}function B(){try{i.texStorage3D(...arguments)}catch(N){qt("WebGLState:",N)}}function V(){try{i.texImage2D(...arguments)}catch(N){qt("WebGLState:",N)}}function Y(){try{i.texImage3D(...arguments)}catch(N){qt("WebGLState:",N)}}function ft(N){return g[N]!==void 0?g[N]:i.getParameter(N)}function xt(N,Mt){g[N]!==Mt&&(i.pixelStorei(N,Mt),g[N]=Mt)}function lt(N){ie.equals(N)===!1&&(i.scissor(N.x,N.y,N.z,N.w),ie.copy(N))}function dt(N){Vt.equals(N)===!1&&(i.viewport(N.x,N.y,N.z,N.w),Vt.copy(N))}function vt(N,Mt){let ut=l.get(Mt);ut===void 0&&(ut=new WeakMap,l.set(Mt,ut));let yt=ut.get(N);yt===void 0&&(yt=i.getUniformBlockIndex(Mt,N.name),ut.set(N,yt))}function St(N,Mt){let yt=l.get(Mt).get(N);c.get(Mt)!==yt&&(i.uniformBlockBinding(Mt,yt,N.__bindingPointIndex),c.set(Mt,yt))}function kt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},g={},j=null,rt={},h={},m=new WeakMap,_=[],T=null,p=!1,f=null,R=null,P=null,S=null,A=null,w=null,L=null,x=new oe(0,0,0),C=0,F=!1,q=null,O=null,Z=null,D=null,H=null,ie.set(0,0,i.canvas.width,i.canvas.height),Vt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ht,disable:At,bindFramebuffer:Gt,drawBuffers:Et,useProgram:Xt,setBlending:$t,setMaterial:nt,setFlipSided:y,setCullFace:I,setLineWidth:z,setPolygonOffset:$,setScissorTest:W,activeTexture:at,bindTexture:b,unbindTexture:_t,compressedTexImage2D:pt,compressedTexImage3D:M,texImage2D:V,texImage3D:Y,pixelStorei:xt,getParameter:ft,updateUBOMapping:vt,uniformBlockBinding:St,texStorage2D:mt,texStorage3D:B,texSubImage2D:d,texSubImage3D:U,compressedTexSubImage2D:X,compressedTexSubImage3D:J,scissor:lt,viewport:dt,reset:kt}}function j0(i,t,e,n,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Qt,u=new WeakMap,g=new Set,h,m=new WeakMap,_=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function T(M,d){return _?new OffscreenCanvas(M,d):gs("canvas")}function p(M,d,U){let X=1,J=pt(M);if((J.width>U||J.height>U)&&(X=U/Math.max(J.width,J.height)),X<1)if(typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&M instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&M instanceof ImageBitmap||typeof VideoFrame<"u"&&M instanceof VideoFrame){let mt=Math.floor(X*J.width),B=Math.floor(X*J.height);h===void 0&&(h=T(mt,B));let V=d?T(mt,B):h;return V.width=mt,V.height=B,V.getContext("2d").drawImage(M,0,0,mt,B),Wt("WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+mt+"x"+B+")."),V}else return"data"in M&&Wt("WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),M;return M}function f(M){return M.generateMipmaps}function R(M){i.generateMipmap(M)}function P(M){return M.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:M.isWebGL3DRenderTarget?i.TEXTURE_3D:M.isWebGLArrayRenderTarget||M.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function S(M,d,U,X,J,mt=!1){if(M!==null){if(i[M]!==void 0)return i[M];Wt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+M+"'")}let B;X&&(B=t.get("EXT_texture_norm16"),B||Wt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let V=d;if(d===i.RED&&(U===i.FLOAT&&(V=i.R32F),U===i.HALF_FLOAT&&(V=i.R16F),U===i.UNSIGNED_BYTE&&(V=i.R8),U===i.UNSIGNED_SHORT&&B&&(V=B.R16_EXT),U===i.SHORT&&B&&(V=B.R16_SNORM_EXT)),d===i.RED_INTEGER&&(U===i.UNSIGNED_BYTE&&(V=i.R8UI),U===i.UNSIGNED_SHORT&&(V=i.R16UI),U===i.UNSIGNED_INT&&(V=i.R32UI),U===i.BYTE&&(V=i.R8I),U===i.SHORT&&(V=i.R16I),U===i.INT&&(V=i.R32I)),d===i.RG&&(U===i.FLOAT&&(V=i.RG32F),U===i.HALF_FLOAT&&(V=i.RG16F),U===i.UNSIGNED_BYTE&&(V=i.RG8),U===i.UNSIGNED_SHORT&&B&&(V=B.RG16_EXT),U===i.SHORT&&B&&(V=B.RG16_SNORM_EXT)),d===i.RG_INTEGER&&(U===i.UNSIGNED_BYTE&&(V=i.RG8UI),U===i.UNSIGNED_SHORT&&(V=i.RG16UI),U===i.UNSIGNED_INT&&(V=i.RG32UI),U===i.BYTE&&(V=i.RG8I),U===i.SHORT&&(V=i.RG16I),U===i.INT&&(V=i.RG32I)),d===i.RGB_INTEGER&&(U===i.UNSIGNED_BYTE&&(V=i.RGB8UI),U===i.UNSIGNED_SHORT&&(V=i.RGB16UI),U===i.UNSIGNED_INT&&(V=i.RGB32UI),U===i.BYTE&&(V=i.RGB8I),U===i.SHORT&&(V=i.RGB16I),U===i.INT&&(V=i.RGB32I)),d===i.RGBA_INTEGER&&(U===i.UNSIGNED_BYTE&&(V=i.RGBA8UI),U===i.UNSIGNED_SHORT&&(V=i.RGBA16UI),U===i.UNSIGNED_INT&&(V=i.RGBA32UI),U===i.BYTE&&(V=i.RGBA8I),U===i.SHORT&&(V=i.RGBA16I),U===i.INT&&(V=i.RGBA32I)),d===i.RGB&&(U===i.UNSIGNED_SHORT&&B&&(V=B.RGB16_EXT),U===i.SHORT&&B&&(V=B.RGB16_SNORM_EXT),U===i.UNSIGNED_INT_5_9_9_9_REV&&(V=i.RGB9_E5),U===i.UNSIGNED_INT_10F_11F_11F_REV&&(V=i.R11F_G11F_B10F)),d===i.RGBA){let Y=mt?ps:ee.getTransfer(J);U===i.FLOAT&&(V=i.RGBA32F),U===i.HALF_FLOAT&&(V=i.RGBA16F),U===i.UNSIGNED_BYTE&&(V=Y===ue?i.SRGB8_ALPHA8:i.RGBA8),U===i.UNSIGNED_SHORT&&B&&(V=B.RGBA16_EXT),U===i.SHORT&&B&&(V=B.RGBA16_SNORM_EXT),U===i.UNSIGNED_SHORT_4_4_4_4&&(V=i.RGBA4),U===i.UNSIGNED_SHORT_5_5_5_1&&(V=i.RGB5_A1)}return(V===i.R16F||V===i.R32F||V===i.RG16F||V===i.RG32F||V===i.RGBA16F||V===i.RGBA32F)&&t.get("EXT_color_buffer_float"),V}function A(M,d){let U;return M?d===null||d===gn||d===ns?U=i.DEPTH24_STENCIL8:d===qe?U=i.DEPTH32F_STENCIL8:d===es&&(U=i.DEPTH24_STENCIL8,Wt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):d===null||d===gn||d===ns?U=i.DEPTH_COMPONENT24:d===qe?U=i.DEPTH_COMPONENT32F:d===es&&(U=i.DEPTH_COMPONENT16),U}function w(M,d){return f(M)===!0||M.isFramebufferTexture&&M.minFilter!==Te&&M.minFilter!==we?Math.log2(Math.max(d.width,d.height))+1:M.mipmaps!==void 0&&M.mipmaps.length>0?M.mipmaps.length:M.isCompressedTexture&&Array.isArray(M.image)?d.mipmaps.length:1}function L(M){let d=M.target;d.removeEventListener("dispose",L),C(d),d.isVideoTexture&&u.delete(d),d.isHTMLTexture&&g.delete(d)}function x(M){let d=M.target;d.removeEventListener("dispose",x),q(d)}function C(M){let d=n.get(M);if(d.__webglInit===void 0)return;let U=M.source,X=m.get(U);if(X){let J=X[d.__cacheKey];J.usedTimes--,J.usedTimes===0&&F(M),Object.keys(X).length===0&&m.delete(U)}n.remove(M)}function F(M){let d=n.get(M);i.deleteTexture(d.__webglTexture);let U=M.source,X=m.get(U);delete X[d.__cacheKey],a.memory.textures--}function q(M){let d=n.get(M);if(M.depthTexture&&(M.depthTexture.dispose(),n.remove(M.depthTexture)),M.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(d.__webglFramebuffer[X]))for(let J=0;J<d.__webglFramebuffer[X].length;J++)i.deleteFramebuffer(d.__webglFramebuffer[X][J]);else i.deleteFramebuffer(d.__webglFramebuffer[X]);d.__webglDepthbuffer&&i.deleteRenderbuffer(d.__webglDepthbuffer[X])}else{if(Array.isArray(d.__webglFramebuffer))for(let X=0;X<d.__webglFramebuffer.length;X++)i.deleteFramebuffer(d.__webglFramebuffer[X]);else i.deleteFramebuffer(d.__webglFramebuffer);if(d.__webglDepthbuffer&&i.deleteRenderbuffer(d.__webglDepthbuffer),d.__webglMultisampledFramebuffer&&i.deleteFramebuffer(d.__webglMultisampledFramebuffer),d.__webglColorRenderbuffer)for(let X=0;X<d.__webglColorRenderbuffer.length;X++)d.__webglColorRenderbuffer[X]&&i.deleteRenderbuffer(d.__webglColorRenderbuffer[X]);d.__webglDepthRenderbuffer&&i.deleteRenderbuffer(d.__webglDepthRenderbuffer)}let U=M.textures;for(let X=0,J=U.length;X<J;X++){let mt=n.get(U[X]);mt.__webglTexture&&(i.deleteTexture(mt.__webglTexture),a.memory.textures--),n.remove(U[X])}n.remove(M)}let O=0;function Z(){O=0}function D(){return O}function H(M){O=M}function et(){let M=O;return M>=s.maxTextures&&Wt("WebGLTextures: Trying to use "+(M+1)+" texture units while this GPU supports only "+s.maxTextures),O+=1,M}function k(M){let d=[];return d.push(M.wrapS),d.push(M.wrapT),d.push(M.wrapR||0),d.push(M.magFilter),d.push(M.minFilter),d.push(M.anisotropy),d.push(M.internalFormat),d.push(M.format),d.push(M.type),d.push(M.generateMipmaps),d.push(M.premultiplyAlpha),d.push(M.flipY),d.push(M.unpackAlignment),d.push(M.colorSpace),d.join()}function ct(M,d){let U=n.get(M);if(M.isVideoTexture&&b(M),M.isRenderTargetTexture===!1&&M.isExternalTexture!==!0&&M.version>0&&U.__version!==M.version){let X=M.image;if(X===null)Wt("WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)Wt("WebGLRenderer: Texture marked for update but image is incomplete");else{At(U,M,d);return}}else M.isExternalTexture&&(U.__webglTexture=M.sourceTexture?M.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,U.__webglTexture,i.TEXTURE0+d)}function ot(M,d){let U=n.get(M);if(M.isRenderTargetTexture===!1&&M.version>0&&U.__version!==M.version){At(U,M,d);return}else M.isExternalTexture&&(U.__webglTexture=M.sourceTexture?M.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,U.__webglTexture,i.TEXTURE0+d)}function j(M,d){let U=n.get(M);if(M.isRenderTargetTexture===!1&&M.version>0&&U.__version!==M.version){At(U,M,d);return}e.bindTexture(i.TEXTURE_3D,U.__webglTexture,i.TEXTURE0+d)}function rt(M,d){let U=n.get(M);if(M.isCubeDepthTexture!==!0&&M.version>0&&U.__version!==M.version){Gt(U,M,d);return}e.bindTexture(i.TEXTURE_CUBE_MAP,U.__webglTexture,i.TEXTURE0+d)}let It={[vr]:i.REPEAT,[Mn]:i.CLAMP_TO_EDGE,[yr]:i.MIRRORED_REPEAT},Pt={[Te]:i.NEAREST,[_l]:i.NEAREST_MIPMAP_NEAREST,[Ps]:i.NEAREST_MIPMAP_LINEAR,[we]:i.LINEAR,[qr]:i.LINEAR_MIPMAP_NEAREST,[ci]:i.LINEAR_MIPMAP_LINEAR},ie={[Ml]:i.NEVER,[wl]:i.ALWAYS,[Sl]:i.LESS,[Ra]:i.LEQUAL,[bl]:i.EQUAL,[Ia]:i.GEQUAL,[El]:i.GREATER,[Tl]:i.NOTEQUAL};function Vt(M,d){if(d.type===qe&&t.has("OES_texture_float_linear")===!1&&(d.magFilter===we||d.magFilter===qr||d.magFilter===Ps||d.magFilter===ci||d.minFilter===we||d.minFilter===qr||d.minFilter===Ps||d.minFilter===ci)&&Wt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(M,i.TEXTURE_WRAP_S,It[d.wrapS]),i.texParameteri(M,i.TEXTURE_WRAP_T,It[d.wrapT]),(M===i.TEXTURE_3D||M===i.TEXTURE_2D_ARRAY)&&i.texParameteri(M,i.TEXTURE_WRAP_R,It[d.wrapR]),i.texParameteri(M,i.TEXTURE_MAG_FILTER,Pt[d.magFilter]),i.texParameteri(M,i.TEXTURE_MIN_FILTER,Pt[d.minFilter]),d.compareFunction&&(i.texParameteri(M,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(M,i.TEXTURE_COMPARE_FUNC,ie[d.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(d.magFilter===Te||d.minFilter!==Ps&&d.minFilter!==ci||d.type===qe&&t.has("OES_texture_float_linear")===!1)return;if(d.anisotropy>1||n.get(d).__currentAnisotropy){let U=t.get("EXT_texture_filter_anisotropic");i.texParameterf(M,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(d.anisotropy,s.getMaxAnisotropy())),n.get(d).__currentAnisotropy=d.anisotropy}}}function Jt(M,d){let U=!1;M.__webglInit===void 0&&(M.__webglInit=!0,d.addEventListener("dispose",L));let X=d.source,J=m.get(X);J===void 0&&(J={},m.set(X,J));let mt=k(d);if(mt!==M.__cacheKey){J[mt]===void 0&&(J[mt]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,U=!0),J[mt].usedTimes++;let B=J[M.__cacheKey];B!==void 0&&(J[M.__cacheKey].usedTimes--,B.usedTimes===0&&F(d)),M.__cacheKey=mt,M.__webglTexture=J[mt].texture}return U}function it(M,d,U){return Math.floor(Math.floor(M/U)/d)}function ht(M,d,U,X){let mt=M.updateRanges;if(mt.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,d.width,d.height,U,X,d.data);else{mt.sort((xt,lt)=>xt.start-lt.start);let B=0;for(let xt=1;xt<mt.length;xt++){let lt=mt[B],dt=mt[xt],vt=lt.start+lt.count,St=it(dt.start,d.width,4),kt=it(lt.start,d.width,4);dt.start<=vt+1&&St===kt&&it(dt.start+dt.count-1,d.width,4)===St?lt.count=Math.max(lt.count,dt.start+dt.count-lt.start):(++B,mt[B]=dt)}mt.length=B+1;let V=e.getParameter(i.UNPACK_ROW_LENGTH),Y=e.getParameter(i.UNPACK_SKIP_PIXELS),ft=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,d.width);for(let xt=0,lt=mt.length;xt<lt;xt++){let dt=mt[xt],vt=Math.floor(dt.start/4),St=Math.ceil(dt.count/4),kt=vt%d.width,N=Math.floor(vt/d.width),Mt=St,ut=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,kt),e.pixelStorei(i.UNPACK_SKIP_ROWS,N),e.texSubImage2D(i.TEXTURE_2D,0,kt,N,Mt,ut,U,X,d.data)}M.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,V),e.pixelStorei(i.UNPACK_SKIP_PIXELS,Y),e.pixelStorei(i.UNPACK_SKIP_ROWS,ft)}}function At(M,d,U){let X=i.TEXTURE_2D;(d.isDataArrayTexture||d.isCompressedArrayTexture)&&(X=i.TEXTURE_2D_ARRAY),d.isData3DTexture&&(X=i.TEXTURE_3D);let J=Jt(M,d),mt=d.source;e.bindTexture(X,M.__webglTexture,i.TEXTURE0+U);let B=n.get(mt);if(mt.version!==B.__version||J===!0){if(e.activeTexture(i.TEXTURE0+U),(typeof ImageBitmap<"u"&&d.image instanceof ImageBitmap)===!1){let ut=ee.getPrimaries(ee.workingColorSpace),yt=d.colorSpace===zn?null:ee.getPrimaries(d.colorSpace),bt=d.colorSpace===zn||ut===yt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,d.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,d.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,bt)}e.pixelStorei(i.UNPACK_ALIGNMENT,d.unpackAlignment);let Y=p(d.image,!1,s.maxTextureSize);Y=_t(d,Y);let ft=r.convert(d.format,d.colorSpace),xt=r.convert(d.type),lt=S(d.internalFormat,ft,xt,d.normalized,d.colorSpace,d.isVideoTexture);Vt(X,d);let dt,vt=d.mipmaps,St=d.isVideoTexture!==!0,kt=B.__version===void 0||J===!0,N=mt.dataReady,Mt=w(d,Y);if(d.isDepthTexture)lt=A(d.format===li,d.type),kt&&(St?e.texStorage2D(i.TEXTURE_2D,1,lt,Y.width,Y.height):e.texImage2D(i.TEXTURE_2D,0,lt,Y.width,Y.height,0,ft,xt,null));else if(d.isDataTexture)if(vt.length>0){St&&kt&&e.texStorage2D(i.TEXTURE_2D,Mt,lt,vt[0].width,vt[0].height);for(let ut=0,yt=vt.length;ut<yt;ut++)dt=vt[ut],St?N&&e.texSubImage2D(i.TEXTURE_2D,ut,0,0,dt.width,dt.height,ft,xt,dt.data):e.texImage2D(i.TEXTURE_2D,ut,lt,dt.width,dt.height,0,ft,xt,dt.data);d.generateMipmaps=!1}else St?(kt&&e.texStorage2D(i.TEXTURE_2D,Mt,lt,Y.width,Y.height),N&&ht(d,Y,ft,xt)):e.texImage2D(i.TEXTURE_2D,0,lt,Y.width,Y.height,0,ft,xt,Y.data);else if(d.isCompressedTexture)if(d.isCompressedArrayTexture){St&&kt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Mt,lt,vt[0].width,vt[0].height,Y.depth);for(let ut=0,yt=vt.length;ut<yt;ut++)if(dt=vt[ut],d.format!==ze)if(ft!==null)if(St){if(N)if(d.layerUpdates.size>0){let bt=qo(dt.width,dt.height,d.format,d.type);for(let gt of d.layerUpdates){let zt=dt.data.subarray(gt*bt/dt.data.BYTES_PER_ELEMENT,(gt+1)*bt/dt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ut,0,0,gt,dt.width,dt.height,1,ft,zt)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ut,0,0,0,dt.width,dt.height,Y.depth,ft,dt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ut,lt,dt.width,dt.height,Y.depth,0,dt.data,0,0);else Wt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else St?N&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,ut,0,0,0,dt.width,dt.height,Y.depth,ft,xt,dt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,ut,lt,dt.width,dt.height,Y.depth,0,ft,xt,dt.data);d.layerUpdates.size>0&&d.clearLayerUpdates()}else{St&&kt&&e.texStorage2D(i.TEXTURE_2D,Mt,lt,vt[0].width,vt[0].height);for(let ut=0,yt=vt.length;ut<yt;ut++)dt=vt[ut],d.format!==ze?ft!==null?St?N&&e.compressedTexSubImage2D(i.TEXTURE_2D,ut,0,0,dt.width,dt.height,ft,dt.data):e.compressedTexImage2D(i.TEXTURE_2D,ut,lt,dt.width,dt.height,0,dt.data):Wt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):St?N&&e.texSubImage2D(i.TEXTURE_2D,ut,0,0,dt.width,dt.height,ft,xt,dt.data):e.texImage2D(i.TEXTURE_2D,ut,lt,dt.width,dt.height,0,ft,xt,dt.data)}else if(d.isDataArrayTexture)if(St){if(kt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Mt,lt,Y.width,Y.height,Y.depth),N)if(d.layerUpdates.size>0){let ut=qo(Y.width,Y.height,d.format,d.type);for(let yt of d.layerUpdates){let bt=Y.data.subarray(yt*ut/Y.data.BYTES_PER_ELEMENT,(yt+1)*ut/Y.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,yt,Y.width,Y.height,1,ft,xt,bt)}d.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Y.width,Y.height,Y.depth,ft,xt,Y.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,lt,Y.width,Y.height,Y.depth,0,ft,xt,Y.data);else if(d.isData3DTexture)St?(kt&&e.texStorage3D(i.TEXTURE_3D,Mt,lt,Y.width,Y.height,Y.depth),N&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Y.width,Y.height,Y.depth,ft,xt,Y.data)):e.texImage3D(i.TEXTURE_3D,0,lt,Y.width,Y.height,Y.depth,0,ft,xt,Y.data);else if(d.isFramebufferTexture){if(kt)if(St)e.texStorage2D(i.TEXTURE_2D,Mt,lt,Y.width,Y.height);else{let ut=Y.width,yt=Y.height;for(let bt=0;bt<Mt;bt++)e.texImage2D(i.TEXTURE_2D,bt,lt,ut,yt,0,ft,xt,null),ut>>=1,yt>>=1}}else if(d.isHTMLTexture){if("texElementImage2D"in i){let ut=i.canvas;if(ut.hasAttribute("layoutsubtree")||ut.setAttribute("layoutsubtree","true"),Y.parentNode!==ut){ut.appendChild(Y),g.add(d),ut.onpaint=yt=>{let bt=yt.changedElements;for(let gt of g)bt.includes(gt.image)&&(gt.needsUpdate=!0)},ut.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,Y);else{let bt=i.RGBA,gt=i.RGBA,zt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,bt,gt,zt,Y)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(vt.length>0){if(St&&kt){let ut=pt(vt[0]);e.texStorage2D(i.TEXTURE_2D,Mt,lt,ut.width,ut.height)}for(let ut=0,yt=vt.length;ut<yt;ut++)dt=vt[ut],St?N&&e.texSubImage2D(i.TEXTURE_2D,ut,0,0,ft,xt,dt):e.texImage2D(i.TEXTURE_2D,ut,lt,ft,xt,dt);d.generateMipmaps=!1}else if(St){if(kt){let ut=pt(Y);e.texStorage2D(i.TEXTURE_2D,Mt,lt,ut.width,ut.height)}N&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ft,xt,Y)}else e.texImage2D(i.TEXTURE_2D,0,lt,ft,xt,Y);f(d)&&R(X),B.__version=mt.version,d.onUpdate&&d.onUpdate(d)}M.__version=d.version}function Gt(M,d,U){if(d.image.length!==6)return;let X=Jt(M,d),J=d.source;e.bindTexture(i.TEXTURE_CUBE_MAP,M.__webglTexture,i.TEXTURE0+U);let mt=n.get(J);if(J.version!==mt.__version||X===!0){e.activeTexture(i.TEXTURE0+U);let B=ee.getPrimaries(ee.workingColorSpace),V=d.colorSpace===zn?null:ee.getPrimaries(d.colorSpace),Y=d.colorSpace===zn||B===V?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,d.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,d.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,d.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Y);let ft=d.isCompressedTexture||d.image[0].isCompressedTexture,xt=d.image[0]&&d.image[0].isDataTexture,lt=[];for(let gt=0;gt<6;gt++)!ft&&!xt?lt[gt]=p(d.image[gt],!0,s.maxCubemapSize):lt[gt]=xt?d.image[gt].image:d.image[gt],lt[gt]=_t(d,lt[gt]);let dt=lt[0],vt=r.convert(d.format,d.colorSpace),St=r.convert(d.type),kt=S(d.internalFormat,vt,St,d.normalized,d.colorSpace),N=d.isVideoTexture!==!0,Mt=mt.__version===void 0||X===!0,ut=J.dataReady,yt=w(d,dt);Vt(i.TEXTURE_CUBE_MAP,d);let bt;if(ft){N&&Mt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,yt,kt,dt.width,dt.height);for(let gt=0;gt<6;gt++){bt=lt[gt].mipmaps;for(let zt=0;zt<bt.length;zt++){let Ot=bt[zt];d.format!==ze?vt!==null?N?ut&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,zt,0,0,Ot.width,Ot.height,vt,Ot.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,zt,kt,Ot.width,Ot.height,0,Ot.data):Wt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?ut&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,zt,0,0,Ot.width,Ot.height,vt,St,Ot.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,zt,kt,Ot.width,Ot.height,0,vt,St,Ot.data)}}}else{if(bt=d.mipmaps,N&&Mt){bt.length>0&&yt++;let gt=pt(lt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,yt,kt,gt.width,gt.height)}for(let gt=0;gt<6;gt++)if(xt){N?ut&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,0,0,lt[gt].width,lt[gt].height,vt,St,lt[gt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,kt,lt[gt].width,lt[gt].height,0,vt,St,lt[gt].data);for(let zt=0;zt<bt.length;zt++){let pe=bt[zt].image[gt].image;N?ut&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,zt+1,0,0,pe.width,pe.height,vt,St,pe.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,zt+1,kt,pe.width,pe.height,0,vt,St,pe.data)}}else{N?ut&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,0,0,vt,St,lt[gt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,kt,vt,St,lt[gt]);for(let zt=0;zt<bt.length;zt++){let Ot=bt[zt];N?ut&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,zt+1,0,0,vt,St,Ot.image[gt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,zt+1,kt,vt,St,Ot.image[gt])}}}f(d)&&R(i.TEXTURE_CUBE_MAP),mt.__version=J.version,d.onUpdate&&d.onUpdate(d)}M.__version=d.version}function Et(M,d,U,X,J,mt){let B=r.convert(U.format,U.colorSpace),V=r.convert(U.type),Y=S(U.internalFormat,B,V,U.normalized,U.colorSpace),ft=n.get(d),xt=n.get(U);if(xt.__renderTarget=d,!ft.__hasExternalTextures){let lt=Math.max(1,d.width>>mt),dt=Math.max(1,d.height>>mt);J===i.TEXTURE_3D||J===i.TEXTURE_2D_ARRAY?e.texImage3D(J,mt,Y,lt,dt,d.depth,0,B,V,null):e.texImage2D(J,mt,Y,lt,dt,0,B,V,null)}e.bindFramebuffer(i.FRAMEBUFFER,M),at(d)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,X,J,xt.__webglTexture,0,W(d)):(J===i.TEXTURE_2D||J>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,X,J,xt.__webglTexture,mt),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Xt(M,d,U){if(i.bindRenderbuffer(i.RENDERBUFFER,M),d.depthBuffer){let X=d.depthTexture,J=X&&X.isDepthTexture?X.type:null,mt=A(d.stencilBuffer,J),B=d.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;at(d)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,W(d),mt,d.width,d.height):U?i.renderbufferStorageMultisample(i.RENDERBUFFER,W(d),mt,d.width,d.height):i.renderbufferStorage(i.RENDERBUFFER,mt,d.width,d.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,B,i.RENDERBUFFER,M)}else{let X=d.textures;for(let J=0;J<X.length;J++){let mt=X[J],B=r.convert(mt.format,mt.colorSpace),V=r.convert(mt.type),Y=S(mt.internalFormat,B,V,mt.normalized,mt.colorSpace);at(d)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,W(d),Y,d.width,d.height):U?i.renderbufferStorageMultisample(i.RENDERBUFFER,W(d),Y,d.width,d.height):i.renderbufferStorage(i.RENDERBUFFER,Y,d.width,d.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ce(M,d,U){let X=d.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,M),!(d.depthTexture&&d.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let J=n.get(d.depthTexture);if(J.__renderTarget=d,(!J.__webglTexture||d.depthTexture.image.width!==d.width||d.depthTexture.image.height!==d.height)&&(d.depthTexture.image.width=d.width,d.depthTexture.image.height=d.height,d.depthTexture.needsUpdate=!0),X){if(J.__webglInit===void 0&&(J.__webglInit=!0,d.depthTexture.addEventListener("dispose",L)),J.__webglTexture===void 0){J.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,J.__webglTexture),Vt(i.TEXTURE_CUBE_MAP,d.depthTexture);let ft=r.convert(d.depthTexture.format),xt=r.convert(d.depthTexture.type),lt;d.depthTexture.format===Sn?lt=i.DEPTH_COMPONENT24:d.depthTexture.format===li&&(lt=i.DEPTH24_STENCIL8);for(let dt=0;dt<6;dt++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,lt,d.width,d.height,0,ft,xt,null)}}else ct(d.depthTexture,0);let mt=J.__webglTexture,B=W(d),V=X?i.TEXTURE_CUBE_MAP_POSITIVE_X+U:i.TEXTURE_2D,Y=d.depthTexture.format===li?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(d.depthTexture.format===Sn)at(d)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Y,V,mt,0,B):i.framebufferTexture2D(i.FRAMEBUFFER,Y,V,mt,0);else if(d.depthTexture.format===li)at(d)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Y,V,mt,0,B):i.framebufferTexture2D(i.FRAMEBUFFER,Y,V,mt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ht(M){let d=n.get(M),U=M.isWebGLCubeRenderTarget===!0;if(d.__boundDepthTexture!==M.depthTexture){let X=M.depthTexture;if(d.__depthDisposeCallback&&d.__depthDisposeCallback(),X){let J=()=>{delete d.__boundDepthTexture,delete d.__depthDisposeCallback,X.removeEventListener("dispose",J)};X.addEventListener("dispose",J),d.__depthDisposeCallback=J}d.__boundDepthTexture=X}if(M.depthTexture&&!d.__autoAllocateDepthBuffer)if(U)for(let X=0;X<6;X++)ce(d.__webglFramebuffer[X],M,X);else{let X=M.texture.mipmaps;X&&X.length>0?ce(d.__webglFramebuffer[0],M,0):ce(d.__webglFramebuffer,M,0)}else if(U){d.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(e.bindFramebuffer(i.FRAMEBUFFER,d.__webglFramebuffer[X]),d.__webglDepthbuffer[X]===void 0)d.__webglDepthbuffer[X]=i.createRenderbuffer(),Xt(d.__webglDepthbuffer[X],M,!1);else{let J=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,mt=d.__webglDepthbuffer[X];i.bindRenderbuffer(i.RENDERBUFFER,mt),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,mt)}}else{let X=M.texture.mipmaps;if(X&&X.length>0?e.bindFramebuffer(i.FRAMEBUFFER,d.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,d.__webglFramebuffer),d.__webglDepthbuffer===void 0)d.__webglDepthbuffer=i.createRenderbuffer(),Xt(d.__webglDepthbuffer,M,!1);else{let J=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,mt=d.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,mt),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,mt)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function $t(M,d,U){let X=n.get(M);d!==void 0&&Et(X.__webglFramebuffer,M,M.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),U!==void 0&&Ht(M)}function nt(M){let d=M.texture,U=n.get(M),X=n.get(d);M.addEventListener("dispose",x);let J=M.textures,mt=M.isWebGLCubeRenderTarget===!0,B=J.length>1;if(B||(X.__webglTexture===void 0&&(X.__webglTexture=i.createTexture()),X.__version=d.version,a.memory.textures++),mt){U.__webglFramebuffer=[];for(let V=0;V<6;V++)if(d.mipmaps&&d.mipmaps.length>0){U.__webglFramebuffer[V]=[];for(let Y=0;Y<d.mipmaps.length;Y++)U.__webglFramebuffer[V][Y]=i.createFramebuffer()}else U.__webglFramebuffer[V]=i.createFramebuffer()}else{if(d.mipmaps&&d.mipmaps.length>0){U.__webglFramebuffer=[];for(let V=0;V<d.mipmaps.length;V++)U.__webglFramebuffer[V]=i.createFramebuffer()}else U.__webglFramebuffer=i.createFramebuffer();if(B)for(let V=0,Y=J.length;V<Y;V++){let ft=n.get(J[V]);ft.__webglTexture===void 0&&(ft.__webglTexture=i.createTexture(),a.memory.textures++)}if(M.samples>0&&at(M)===!1){U.__webglMultisampledFramebuffer=i.createFramebuffer(),U.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let V=0;V<J.length;V++){let Y=J[V];U.__webglColorRenderbuffer[V]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,U.__webglColorRenderbuffer[V]);let ft=r.convert(Y.format,Y.colorSpace),xt=r.convert(Y.type),lt=S(Y.internalFormat,ft,xt,Y.normalized,Y.colorSpace,M.isXRRenderTarget===!0),dt=W(M);i.renderbufferStorageMultisample(i.RENDERBUFFER,dt,lt,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+V,i.RENDERBUFFER,U.__webglColorRenderbuffer[V])}i.bindRenderbuffer(i.RENDERBUFFER,null),M.depthBuffer&&(U.__webglDepthRenderbuffer=i.createRenderbuffer(),Xt(U.__webglDepthRenderbuffer,M,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(mt){e.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture),Vt(i.TEXTURE_CUBE_MAP,d);for(let V=0;V<6;V++)if(d.mipmaps&&d.mipmaps.length>0)for(let Y=0;Y<d.mipmaps.length;Y++)Et(U.__webglFramebuffer[V][Y],M,d,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+V,Y);else Et(U.__webglFramebuffer[V],M,d,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+V,0);f(d)&&R(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(B){for(let V=0,Y=J.length;V<Y;V++){let ft=J[V],xt=n.get(ft),lt=i.TEXTURE_2D;(M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(lt=M.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(lt,xt.__webglTexture),Vt(lt,ft),Et(U.__webglFramebuffer,M,ft,i.COLOR_ATTACHMENT0+V,lt,0),f(ft)&&R(lt)}e.unbindTexture()}else{let V=i.TEXTURE_2D;if((M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(V=M.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(V,X.__webglTexture),Vt(V,d),d.mipmaps&&d.mipmaps.length>0)for(let Y=0;Y<d.mipmaps.length;Y++)Et(U.__webglFramebuffer[Y],M,d,i.COLOR_ATTACHMENT0,V,Y);else Et(U.__webglFramebuffer,M,d,i.COLOR_ATTACHMENT0,V,0);f(d)&&R(V),e.unbindTexture()}M.depthBuffer&&Ht(M)}function y(M){let d=M.textures;for(let U=0,X=d.length;U<X;U++){let J=d[U];if(f(J)){let mt=P(M),B=n.get(J).__webglTexture;e.bindTexture(mt,B),R(mt),e.unbindTexture()}}}let I=[],z=[];function $(M){if(M.samples>0){if(at(M)===!1){let d=M.textures,U=M.width,X=M.height,J=i.COLOR_BUFFER_BIT,mt=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,B=n.get(M),V=d.length>1;if(V)for(let ft=0;ft<d.length;ft++)e.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ft,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,B.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ft,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,B.__webglMultisampledFramebuffer);let Y=M.texture.mipmaps;Y&&Y.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,B.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,B.__webglFramebuffer);for(let ft=0;ft<d.length;ft++){if(M.resolveDepthBuffer&&(M.depthBuffer&&(J|=i.DEPTH_BUFFER_BIT),M.stencilBuffer&&M.resolveStencilBuffer&&(J|=i.STENCIL_BUFFER_BIT)),V){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,B.__webglColorRenderbuffer[ft]);let xt=n.get(d[ft]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,xt,0)}i.blitFramebuffer(0,0,U,X,0,0,U,X,J,i.NEAREST),c===!0&&(I.length=0,z.length=0,I.push(i.COLOR_ATTACHMENT0+ft),M.depthBuffer&&M.storeMultisampledDepthBuffer===!1&&(I.push(mt),z.push(mt),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,z)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,I))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),V)for(let ft=0;ft<d.length;ft++){e.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ft,i.RENDERBUFFER,B.__webglColorRenderbuffer[ft]);let xt=n.get(d[ft]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,B.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ft,i.TEXTURE_2D,xt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,B.__webglMultisampledFramebuffer)}else if(M.depthBuffer&&M.storeMultisampledDepthBuffer===!1&&c){let d=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[d])}}}function W(M){return Math.min(s.maxSamples,M.samples)}function at(M){let d=n.get(M);return M.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&d.__useRenderToTexture!==!1}function b(M){let d=a.render.frame;u.get(M)!==d&&(u.set(M,d),M.update())}function _t(M,d){let U=M.colorSpace,X=M.format,J=M.type;return M.isCompressedTexture===!0||M.isVideoTexture===!0||U!==vi&&U!==zn&&(ee.getTransfer(U)===ue?(X!==ze||J!==je)&&Wt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):qt("WebGLTextures: Unsupported texture color space:",U)),d}function pt(M){return typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement?(l.width=M.naturalWidth||M.width,l.height=M.naturalHeight||M.height):typeof VideoFrame<"u"&&M instanceof VideoFrame?(l.width=M.displayWidth,l.height=M.displayHeight):(l.width=M.width,l.height=M.height),l}this.allocateTextureUnit=et,this.resetTextureUnits=Z,this.getTextureUnits=D,this.setTextureUnits=H,this.setTexture2D=ct,this.setTexture2DArray=ot,this.setTexture3D=j,this.setTextureCube=rt,this.rebindTextures=$t,this.setupRenderTarget=nt,this.updateRenderTargetMipmap=y,this.updateMultisampleRenderTarget=$,this.setupDepthRenderbuffer=Ht,this.setupFrameBufferTexture=Et,this.useMultisampledRTT=at,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function tm(i,t){function e(n,s=zn){let r,a=ee.getTransfer(s);if(n===je)return i.UNSIGNED_BYTE;if(n===Zr)return i.UNSIGNED_SHORT_4_4_4_4;if(n===$r)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Uo)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Fo)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Do)return i.BYTE;if(n===No)return i.SHORT;if(n===es)return i.UNSIGNED_SHORT;if(n===Yr)return i.INT;if(n===gn)return i.UNSIGNED_INT;if(n===qe)return i.FLOAT;if(n===tn)return i.HALF_FLOAT;if(n===Oo)return i.ALPHA;if(n===Bo)return i.RGB;if(n===ze)return i.RGBA;if(n===Sn)return i.DEPTH_COMPONENT;if(n===li)return i.DEPTH_STENCIL;if(n===zo)return i.RED;if(n===Jr)return i.RED_INTEGER;if(n===hi)return i.RG;if(n===Kr)return i.RG_INTEGER;if(n===Qr)return i.RGBA_INTEGER;if(n===Ls||n===Ds||n===Ns||n===Us)if(a===ue)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ls)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ds)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ns)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Us)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ls)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ds)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ns)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Us)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===jr||n===ta||n===ea||n===na)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===jr)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ta)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ea)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===na)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ia||n===sa||n===ra||n===aa||n===oa||n===Fs||n===ca)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ia||n===sa)return a===ue?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ra)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===aa)return r.COMPRESSED_R11_EAC;if(n===oa)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Fs)return r.COMPRESSED_RG11_EAC;if(n===ca)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===la||n===ha||n===ua||n===da||n===fa||n===pa||n===ma||n===ga||n===_a||n===xa||n===va||n===ya||n===Ma||n===Sa)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===la)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ha)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ua)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===da)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===fa)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===pa)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ma)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ga)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===_a)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===xa)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===va)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ya)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ma)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Sa)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ba||n===Ea||n===Ta)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===ba)return a===ue?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ea)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ta)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===wa||n===Aa||n===Os||n===Ca)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===wa)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Aa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Os)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ca)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ns?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var em=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,nm=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,uc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new Es(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Ke({vertexShader:em,fragmentShader:nm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Be(new Ts(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},dc=class extends bn{constructor(t,e){super();let n=this,s=null,r=1,a=null,o="local-floor",c=1,l=null,u=null,g=null,h=null,m=null,_=null,T=typeof XRWebGLBinding<"u",p=new uc,f={},R=e.getContextAttributes(),P=null,S=null,A=[],w=[],L=new Qt,x=null,C=null,F=new Oe;F.viewport=new xe;let q=new Oe;q.viewport=new xe;let O=[F,q],Z=new Vr,D=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(it){let ht=A[it];return ht===void 0&&(ht=new $i,A[it]=ht),ht.getTargetRaySpace()},this.getControllerGrip=function(it){let ht=A[it];return ht===void 0&&(ht=new $i,A[it]=ht),ht.getGripSpace()},this.getHand=function(it){let ht=A[it];return ht===void 0&&(ht=new $i,A[it]=ht),ht.getHandSpace()};function et(it){let ht=w.indexOf(it.inputSource);if(ht===-1)return;let At=A[ht];At!==void 0&&(At.update(it.inputSource,it.frame,l||a),At.dispatchEvent({type:it.type,data:it.inputSource}))}function k(){s.removeEventListener("select",et),s.removeEventListener("selectstart",et),s.removeEventListener("selectend",et),s.removeEventListener("squeeze",et),s.removeEventListener("squeezestart",et),s.removeEventListener("squeezeend",et),s.removeEventListener("end",k),s.removeEventListener("inputsourceschange",ct);for(let it=0;it<A.length;it++){let ht=w[it];ht!==null&&(w[it]=null,A[it].disconnect(ht))}D=null,H=null,p.reset();for(let it in f)delete f[it];if(t.setRenderTarget(P),m=null,h=null,g=null,s=null,S=null,Jt.stop(),n.isPresenting=!1,t.setPixelRatio(x),t.setSize(L.width,L.height,!1),C!==null){let it=C.camera;it.fov=C.fov,it.zoom=C.zoom,it.updateProjectionMatrix(),C=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(it){r=it,n.isPresenting===!0&&Wt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(it){o=it,n.isPresenting===!0&&Wt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(it){l=it},this.getBaseLayer=function(){return h!==null?h:m},this.getBinding=function(){return g===null&&T&&(g=new XRWebGLBinding(s,e)),g},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(it){if(s=it,s!==null){if(P=t.getRenderTarget(),s.addEventListener("select",et),s.addEventListener("selectstart",et),s.addEventListener("selectend",et),s.addEventListener("squeeze",et),s.addEventListener("squeezestart",et),s.addEventListener("squeezeend",et),s.addEventListener("end",k),s.addEventListener("inputsourceschange",ct),R.xrCompatible!==!0&&await e.makeXRCompatible(),x=t.getPixelRatio(),t.getSize(L),T&&"createProjectionLayer"in XRWebGLBinding.prototype){let At=null,Gt=null,Et=null;R.depth&&(Et=R.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,At=R.stencil?li:Sn,Gt=R.stencil?ns:gn);let Xt={colorFormat:e.RGBA8,depthFormat:Et,scaleFactor:r};g=this.getBinding(),h=g.createProjectionLayer(Xt),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),S=new Ae(h.textureWidth,h.textureHeight,{format:ze,type:je,depthTexture:new ei(h.textureWidth,h.textureHeight,Gt,void 0,void 0,void 0,void 0,void 0,void 0,At),stencilBuffer:R.stencil,colorSpace:t.outputColorSpace,samples:R.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{let At={antialias:R.antialias,alpha:!0,depth:R.depth,stencil:R.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,e,At),s.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),S=new Ae(m.framebufferWidth,m.framebufferHeight,{format:ze,type:je,colorSpace:t.outputColorSpace,stencilBuffer:R.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1,storeMultisampledDepthBuffer:m.ignoreDepthValues===!1,storeMultisampledStencilBuffer:m.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),Jt.setContext(s),Jt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function ct(it){for(let ht=0;ht<it.removed.length;ht++){let At=it.removed[ht],Gt=w.indexOf(At);Gt>=0&&(w[Gt]=null,A[Gt].disconnect(At))}for(let ht=0;ht<it.added.length;ht++){let At=it.added[ht],Gt=w.indexOf(At);if(Gt===-1){for(let Xt=0;Xt<A.length;Xt++)if(Xt>=w.length){w.push(At),Gt=Xt;break}else if(w[Xt]===null){w[Xt]=At,Gt=Xt;break}if(Gt===-1)break}let Et=A[Gt];Et&&Et.connect(At)}}let ot=new tt,j=new tt;function rt(it,ht,At){ot.setFromMatrixPosition(ht.matrixWorld),j.setFromMatrixPosition(At.matrixWorld);let Gt=ot.distanceTo(j),Et=ht.projectionMatrix.elements,Xt=At.projectionMatrix.elements,ce=Et[14]/(Et[10]-1),Ht=Et[14]/(Et[10]+1),$t=(Et[9]+1)/Et[5],nt=(Et[9]-1)/Et[5],y=(Et[8]-1)/Et[0],I=(Xt[8]+1)/Xt[0],z=ce*y,$=ce*I,W=Gt/(-y+I),at=W*-y;if(ht.matrixWorld.decompose(it.position,it.quaternion,it.scale),it.translateX(at),it.translateZ(W),it.matrixWorld.compose(it.position,it.quaternion,it.scale),it.matrixWorldInverse.copy(it.matrixWorld).invert(),Et[10]===-1)it.projectionMatrix.copy(ht.projectionMatrix),it.projectionMatrixInverse.copy(ht.projectionMatrixInverse);else{let b=ce+W,_t=Ht+W,pt=z-at,M=$+(Gt-at),d=$t*Ht/_t*b,U=nt*Ht/_t*b;it.projectionMatrix.makePerspective(pt,M,d,U,b,_t),it.projectionMatrixInverse.copy(it.projectionMatrix).invert()}}function It(it,ht){ht===null?it.matrixWorld.copy(it.matrix):it.matrixWorld.multiplyMatrices(ht.matrixWorld,it.matrix),it.matrixWorldInverse.copy(it.matrixWorld).invert()}this.updateCamera=function(it){if(s===null)return;let ht=it.near,At=it.far;p.texture!==null&&(p.depthNear>0&&(ht=p.depthNear),p.depthFar>0&&(At=p.depthFar)),Z.near=q.near=F.near=ht,Z.far=q.far=F.far=At,(D!==Z.near||H!==Z.far)&&(s.updateRenderState({depthNear:Z.near,depthFar:Z.far}),D=Z.near,H=Z.far),Z.layers.mask=it.layers.mask|6,F.layers.mask=Z.layers.mask&-5,q.layers.mask=Z.layers.mask&-3;let Gt=it.parent,Et=Z.cameras;It(Z,Gt);for(let Xt=0;Xt<Et.length;Xt++)It(Et[Xt],Gt);Et.length===2?rt(Z,F,q):Z.projectionMatrix.copy(F.projectionMatrix),C===null&&it.isPerspectiveCamera&&(C={camera:it,fov:it.fov,zoom:it.zoom}),Pt(it,Z,Gt)};function Pt(it,ht,At){At===null?it.matrix.copy(ht.matrixWorld):(it.matrix.copy(At.matrixWorld),it.matrix.invert(),it.matrix.multiply(ht.matrixWorld)),it.matrix.decompose(it.position,it.quaternion,it.scale),it.updateMatrixWorld(!0),it.projectionMatrix.copy(ht.projectionMatrix),it.projectionMatrixInverse.copy(ht.projectionMatrixInverse),it.isPerspectiveCamera&&(it.fov=Sr*2*Math.atan(1/it.projectionMatrix.elements[5]),it.zoom=1)}this.getCamera=function(){return Z},this.getFoveation=function(){if(!(h===null&&m===null))return c},this.setFoveation=function(it){c=it,h!==null&&(h.fixedFoveation=it),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=it)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(Z)},this.getCameraTexture=function(it){return f[it]};let ie=null;function Vt(it,ht){if(u=ht.getViewerPose(l||a),_=ht,u!==null){let At=u.views;m!==null&&(t.setRenderTargetFramebuffer(S,m.framebuffer),t.setRenderTarget(S));let Gt=!1;At.length!==Z.cameras.length&&(Z.cameras.length=0,Gt=!0);for(let Ht=0;Ht<At.length;Ht++){let $t=At[Ht],nt=null;if(m!==null)nt=m.getViewport($t);else{let I=g.getViewSubImage(h,$t);nt=I.viewport,Ht===0&&(t.setRenderTargetTextures(S,I.colorTexture,I.depthStencilTexture),t.setRenderTarget(S))}let y=O[Ht];y===void 0&&(y=new Oe,y.layers.enable(Ht),y.viewport=new xe,O[Ht]=y),y.matrix.fromArray($t.transform.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale),y.projectionMatrix.fromArray($t.projectionMatrix),y.projectionMatrixInverse.copy(y.projectionMatrix).invert(),y.viewport.set(nt.x,nt.y,nt.width,nt.height),Ht===0&&(Z.matrix.copy(y.matrix),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale)),Gt===!0&&Z.cameras.push(y)}let Et=s.enabledFeatures;if(Et&&Et.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&T){g=n.getBinding();let Ht=g.getDepthInformation(At[0]);Ht&&Ht.isValid&&Ht.texture&&p.init(Ht,s.renderState)}if(Et&&Et.includes("camera-access")&&T){t.state.unbindTexture(),g=n.getBinding();for(let Ht=0;Ht<At.length;Ht++){let $t=At[Ht].camera;if($t){let nt=f[$t];nt||(nt=new Es,f[$t]=nt);let y=g.getCameraImage($t);nt.sourceTexture=y}}}}for(let At=0;At<A.length;At++){let Gt=w[At],Et=A[At];Gt!==null&&Et!==void 0&&Et.update(Gt,ht,l||a)}ie&&ie(it,ht),ht.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ht}),_=null}let Jt=new ih;Jt.setAnimationLoop(Vt),this.setAnimationLoop=function(it){ie=it},this.dispose=function(){}}},im=new Me,lh=new Zt;lh.set(-1,0,0,0,1,0,0,0,1);function sm(i,t){function e(p,f){p.matrixAutoUpdate===!0&&p.updateMatrix(),f.value.copy(p.matrix)}function n(p,f){f.color.getRGB(p.fogColor.value,Ho(i)),f.isFog?(p.fogNear.value=f.near,p.fogFar.value=f.far):f.isFogExp2&&(p.fogDensity.value=f.density)}function s(p,f,R,P,S){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?r(p,f):f.isMeshLambertMaterial?(r(p,f),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(r(p,f),g(p,f)):f.isMeshPhongMaterial?(r(p,f),u(p,f),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(r(p,f),h(p,f),f.isMeshPhysicalMaterial&&m(p,f,S)):f.isMeshMatcapMaterial?(r(p,f),_(p,f)):f.isMeshDepthMaterial?r(p,f):f.isMeshDistanceMaterial?(r(p,f),T(p,f)):f.isMeshNormalMaterial?r(p,f):f.isLineBasicMaterial?(a(p,f),f.isLineDashedMaterial&&o(p,f)):f.isPointsMaterial?c(p,f,R,P):f.isSpriteMaterial?l(p,f):f.isShadowMaterial?(p.color.value.copy(f.color),p.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(p,f){p.opacity.value=f.opacity,f.color&&p.diffuse.value.copy(f.color),f.emissive&&p.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(p.map.value=f.map,e(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,e(f.alphaMap,p.alphaMapTransform)),f.bumpMap&&(p.bumpMap.value=f.bumpMap,e(f.bumpMap,p.bumpMapTransform),p.bumpScale.value=f.bumpScale,f.side===Ge&&(p.bumpScale.value*=-1)),f.normalMap&&(p.normalMap.value=f.normalMap,e(f.normalMap,p.normalMapTransform),p.normalScale.value.copy(f.normalScale),f.side===Ge&&p.normalScale.value.negate()),f.displacementMap&&(p.displacementMap.value=f.displacementMap,e(f.displacementMap,p.displacementMapTransform),p.displacementScale.value=f.displacementScale,p.displacementBias.value=f.displacementBias),f.emissiveMap&&(p.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,p.emissiveMapTransform)),f.specularMap&&(p.specularMap.value=f.specularMap,e(f.specularMap,p.specularMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest);let R=t.get(f),P=R.envMap,S=R.envMapRotation;P&&(p.envMap.value=P,p.envMapRotation.value.setFromMatrix4(im.makeRotationFromEuler(S)).transpose(),P.isCubeTexture&&P.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(lh),p.reflectivity.value=f.reflectivity,p.ior.value=f.ior,p.refractionRatio.value=f.refractionRatio),f.lightMap&&(p.lightMap.value=f.lightMap,p.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,p.lightMapTransform)),f.aoMap&&(p.aoMap.value=f.aoMap,p.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,p.aoMapTransform))}function a(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,f.map&&(p.map.value=f.map,e(f.map,p.mapTransform))}function o(p,f){p.dashSize.value=f.dashSize,p.totalSize.value=f.dashSize+f.gapSize,p.scale.value=f.scale}function c(p,f,R,P){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.size.value=f.size*R,p.scale.value=P*.5,f.map&&(p.map.value=f.map,e(f.map,p.uvTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,e(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function l(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.rotation.value=f.rotation,f.map&&(p.map.value=f.map,e(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,e(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function u(p,f){p.specular.value.copy(f.specular),p.shininess.value=Math.max(f.shininess,1e-4)}function g(p,f){f.gradientMap&&(p.gradientMap.value=f.gradientMap)}function h(p,f){p.metalness.value=f.metalness,f.metalnessMap&&(p.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,p.metalnessMapTransform)),p.roughness.value=f.roughness,f.roughnessMap&&(p.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,p.roughnessMapTransform)),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)}function m(p,f,R){p.ior.value=f.ior,f.sheen>0&&(p.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),p.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(p.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,p.sheenColorMapTransform)),f.sheenRoughnessMap&&(p.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,p.sheenRoughnessMapTransform))),f.clearcoat>0&&(p.clearcoat.value=f.clearcoat,p.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(p.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,p.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(p.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Ge&&p.clearcoatNormalScale.value.negate())),f.dispersion>0&&(p.dispersion.value=f.dispersion),f.retroreflectivity>0&&(p.retroreflectivity.value=f.retroreflectivity),f.iridescence>0&&(p.iridescence.value=f.iridescence,p.iridescenceIOR.value=f.iridescenceIOR,p.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(p.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,p.iridescenceMapTransform)),f.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),f.transmission>0&&(p.transmission.value=f.transmission,p.transmissionSamplerMap.value=R.texture,p.transmissionSamplerSize.value.set(R.width,R.height),f.transmissionMap&&(p.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,p.transmissionMapTransform)),p.thickness.value=f.thickness,f.thicknessMap&&(p.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=f.attenuationDistance,p.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(p.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(p.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=f.specularIntensity,p.specularColor.value.copy(f.specularColor),f.specularColorMap&&(p.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,p.specularColorMapTransform)),f.specularIntensityMap&&(p.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,p.specularIntensityMapTransform))}function _(p,f){f.matcap&&(p.matcap.value=f.matcap)}function T(p,f){let R=t.get(f).light;p.referencePosition.value.setFromMatrixPosition(R.matrixWorld),p.nearDistance.value=R.shadow.camera.near,p.farDistance.value=R.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function rm(i,t,e,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(S,A){let w=A.program;n.uniformBlockBinding(S,w)}function l(S,A){let w=s[S.id];w===void 0&&(p(S),w=u(S),s[S.id]=w,S.addEventListener("dispose",R));let L=A.program;n.updateUBOMapping(S,L);let x=t.render.frame;r[S.id]!==x&&(h(S),r[S.id]=x)}function u(S){let A=g();S.__bindingPointIndex=A;let w=i.createBuffer(),L=S.__size,x=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,w),i.bufferData(i.UNIFORM_BUFFER,L,x),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,A,w),w}function g(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return qt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(S){let A=s[S.id],w=S.uniforms,L=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,A);for(let x=0,C=w.length;x<C;x++){let F=w[x];if(Array.isArray(F))for(let q=0,O=F.length;q<O;q++)m(F[q],x,q,L);else m(F,x,0,L)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(S,A,w,L){if(T(S,A,w,L)===!0){let x=S.__offset,C=S.value;if(Array.isArray(C)){let F=0;for(let q=0;q<C.length;q++){let O=C[q],Z=f(O);_(O,S.__data,F),typeof O!="number"&&typeof O!="boolean"&&!O.isMatrix3&&!ArrayBuffer.isView(O)&&(F+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}}else _(C,S.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,x,S.__data)}}function _(S,A,w){typeof S=="number"||typeof S=="boolean"?A[0]=S:S.isMatrix3?(A[0]=S.elements[0],A[1]=S.elements[1],A[2]=S.elements[2],A[3]=0,A[4]=S.elements[3],A[5]=S.elements[4],A[6]=S.elements[5],A[7]=0,A[8]=S.elements[6],A[9]=S.elements[7],A[10]=S.elements[8],A[11]=0):ArrayBuffer.isView(S)?A.set(new S.constructor(S.buffer,S.byteOffset,A.length)):S.toArray(A,w)}function T(S,A,w,L){let x=S.value,C=A+"_"+w;if(L[C]===void 0)return typeof x=="number"||typeof x=="boolean"?L[C]=x:ArrayBuffer.isView(x)?L[C]=x.slice():L[C]=x.clone(),!0;{let F=L[C];if(typeof x=="number"||typeof x=="boolean"){if(F!==x)return L[C]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(F.equals(x)===!1)return F.copy(x),!0}}return!1}function p(S){let A=S.uniforms,w=0,L=16;for(let C=0,F=A.length;C<F;C++){let q=Array.isArray(A[C])?A[C]:[A[C]];for(let O=0,Z=q.length;O<Z;O++){let D=q[O],H=Array.isArray(D.value)?D.value:[D.value];for(let et=0,k=H.length;et<k;et++){let ct=H[et],ot=f(ct),j=w%L,rt=j%ot.boundary,It=j+rt;w+=rt,It!==0&&L-It<ot.storage&&(w+=L-It),D.__data=new Float32Array(ot.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=w,w+=ot.storage}}}let x=w%L;return x>0&&(w+=L-x),S.__size=w,S.__cache={},this}function f(S){let A={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(A.boundary=4,A.storage=4):S.isVector2?(A.boundary=8,A.storage=8):S.isVector3||S.isColor?(A.boundary=16,A.storage=12):S.isVector4?(A.boundary=16,A.storage=16):S.isMatrix3?(A.boundary=48,A.storage=48):S.isMatrix4?(A.boundary=64,A.storage=64):S.isTexture?Wt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(A.boundary=16,A.storage=S.byteLength):Wt("WebGLRenderer: Unsupported uniform value type.",S),A}function R(S){let A=S.target;A.removeEventListener("dispose",R);let w=a.indexOf(A.__bindingPointIndex);a.splice(w,1),i.deleteBuffer(s[A.id]),delete s[A.id],delete r[A.id]}function P(){for(let S in s)i.deleteBuffer(s[S]);a=[],s={},r={}}return{bind:c,update:l,dispose:P}}var am=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),wn=null;function om(){return wn===null&&(wn=new Mi(am,16,16,hi,tn),wn.name="DFG_LUT",wn.minFilter=we,wn.magFilter=we,wn.wrapS=Mn,wn.wrapT=Mn,wn.generateMipmaps=!1,wn.needsUpdate=!0),wn}var Ua=class{constructor(t={}){let{canvas:e=Cl(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:g=!1,reversedDepthBuffer:h=!1,outputBufferType:m=je}=t;this.isWebGLRenderer=!0;let _;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=n.getContextAttributes().alpha}else _=a;let T=m,p=new Set([Qr,Kr,Jr]),f=new Set([je,gn,es,ns,Zr,$r]),R=new Uint32Array(4),P=new Int32Array(4),S=new tt,A=null,w=null,L=[],x=[],C=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=mn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let F=this,q=!1,O=null,Z=null,D=null,H=null;this._outputColorSpace=Je;let et=0,k=0,ct=null,ot=-1,j=null,rt=new xe,It=new xe,Pt=null,ie=new oe(0),Vt=0,Jt=e.width,it=e.height,ht=1,At=null,Gt=null,Et=new xe(0,0,Jt,it),Xt=new xe(0,0,Jt,it),ce=!1,Ht=new Ss,$t=!1,nt=!1,y=new Me,I=new tt,z=new xe,$={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},W=!1;function at(){return ct===null?ht:1}let b=n;function _t(v,G){return e.getContext(v,G)}let pt,M,d,U,X,J,mt,B,V,Y,ft,xt,lt,dt,vt,St,kt,N,Mt,ut,yt,bt,gt;try{let v={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:g};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",pe,!1),e.addEventListener("webglcontextrestored",le,!1),e.addEventListener("webglcontextcreationerror",ln,!1),b===null){let G="webgl2";if(b=_t(G,v),b===null)throw _t(G)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}zt()}catch(v){throw e.removeEventListener("webglcontextlost",pe,!1),e.removeEventListener("webglcontextrestored",le,!1),e.removeEventListener("webglcontextcreationerror",ln,!1),qt("WebGLRenderer: "+v.message),v}function zt(){pt=new pp(b),pt.init(),yt=new tm(b,pt),M=new sp(b,pt,t,yt),d=new Q0(b,pt),M.reversedDepthBuffer&&h&&d.buffers.depth.setReversed(!0),Z=b.createFramebuffer(),D=b.createFramebuffer(),H=b.createFramebuffer(),U=new _p(b),X=new B0,J=new j0(b,pt,d,X,M,yt,U),mt=new fp(F),B=new xu(b),bt=new np(b,B),V=new mp(b,B,U,bt),Y=new vp(b,V,B,bt,U),N=new xp(b,M,J),vt=new rp(X),ft=new O0(F,mt,pt,M,bt,vt),xt=new sm(F,X),lt=new k0,dt=new q0(pt),kt=new ep(F,mt,d,Y,_,c),St=new K0(F,Y,M),gt=new rm(b,U,M,d),Mt=new ip(b,pt,U),ut=new gp(b,pt,U),U.programs=ft.programs,F.capabilities=M,F.extensions=pt,F.properties=X,F.renderLists=lt,F.shadowMap=St,F.state=d,F.info=U}T!==je&&(C=new Mp(T,e.width,e.height,o,s,r));let Ot=new dc(F,b);this.xr=Ot,this.getContext=function(){return b},this.getContextAttributes=function(){return b.getContextAttributes()},this.forceContextLoss=function(){let v=pt.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){let v=pt.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return ht},this.setPixelRatio=function(v){v!==void 0&&(ht=v,this.setSize(Jt,it,!1))},this.getSize=function(v){return v.set(Jt,it)},this.setSize=function(v,G,st=!0){if(Ot.isPresenting){Wt("WebGLRenderer: Can't change size while VR device is presenting.");return}Jt=v,it=G,e.width=Math.floor(v*ht),e.height=Math.floor(G*ht),st===!0&&(e.style.width=v+"px",e.style.height=G+"px"),C!==null&&C.setSize(e.width,e.height),this.setViewport(0,0,v,G)},this.getDrawingBufferSize=function(v){return v.set(Jt*ht,it*ht).floor()},this.setDrawingBufferSize=function(v,G,st){Jt=v,it=G,ht=st,e.width=Math.floor(v*st),e.height=Math.floor(G*st),this.setViewport(0,0,v,G)},this.setEffects=function(v){if(T===je){qt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(v){for(let G=0;G<v.length;G++)if(v[G].isOutputPass===!0){Wt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}C.setEffects(v||[])},this.getCurrentViewport=function(v){return v.copy(rt)},this.getViewport=function(v){return v.copy(Et)},this.setViewport=function(v,G,st,K){v.isVector4?Et.set(v.x,v.y,v.z,v.w):Et.set(v,G,st,K),d.viewport(rt.copy(Et).multiplyScalar(ht).round())},this.getScissor=function(v){return v.copy(Xt)},this.setScissor=function(v,G,st,K){v.isVector4?Xt.set(v.x,v.y,v.z,v.w):Xt.set(v,G,st,K),d.scissor(It.copy(Xt).multiplyScalar(ht).round())},this.getScissorTest=function(){return ce},this.setScissorTest=function(v){d.setScissorTest(ce=v)},this.setOpaqueSort=function(v){At=v},this.setTransparentSort=function(v){Gt=v},this.getClearColor=function(v){return v.copy(kt.getClearColor())},this.setClearColor=function(){kt.setClearColor(...arguments)},this.getClearAlpha=function(){return kt.getClearAlpha()},this.setClearAlpha=function(){kt.setClearAlpha(...arguments)},this.clear=function(v=!0,G=!0,st=!0){let K=0;if(v){let Q=!1;if(ct!==null){let Ct=ct.texture.format;Q=p.has(Ct)}if(Q){let Ct=ct.texture.type,Dt=f.has(Ct),wt=kt.getClearColor(),Nt=kt.getClearAlpha(),Bt=wt.r,Kt=wt.g,se=wt.b;Dt?(R[0]=Bt,R[1]=Kt,R[2]=se,R[3]=Nt,b.clearBufferuiv(b.COLOR,0,R)):(P[0]=Bt,P[1]=Kt,P[2]=se,P[3]=Nt,b.clearBufferiv(b.COLOR,0,P))}else K|=b.COLOR_BUFFER_BIT}G&&(K|=b.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),st&&(K|=b.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),K!==0&&b.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(v){v.setRenderer(this),O=v},this.dispose=function(){e.removeEventListener("webglcontextlost",pe,!1),e.removeEventListener("webglcontextrestored",le,!1),e.removeEventListener("webglcontextcreationerror",ln,!1),kt.dispose(),lt.dispose(),dt.dispose(),X.dispose(),mt.dispose(),Y.dispose(),bt.dispose(),gt.dispose(),ft.dispose(),Ot.dispose(),Ot.removeEventListener("sessionstart",Mc),Ot.removeEventListener("sessionend",Sc),di.stop()};function pe(v){v.preventDefault(),Go("WebGLRenderer: Context Lost."),q=!0}function le(){Go("WebGLRenderer: Context Restored."),q=!1;let v=U.autoReset,G=St.enabled,st=St.autoUpdate,K=St.needsUpdate,Q=St.type;zt(),U.autoReset=v,St.enabled=G,St.autoUpdate=st,St.needsUpdate=K,St.type=Q}function ln(v){qt("WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function xn(v){let G=v.target;G.removeEventListener("dispose",xn),Rh(G)}function Rh(v){Ih(v),X.remove(v)}function Ih(v){let G=X.get(v).programs;G!==void 0&&(G.forEach(function(st){ft.releaseProgram(st)}),v.isShaderMaterial&&ft.releaseShaderCache(v))}this.renderBufferDirect=function(v,G,st,K,Q,Ct){G===null&&(G=$);let Dt=Q.isMesh&&Q.matrixWorld.determinantAffine()<0,wt=Dh(v,G,st,K,Q);d.setMaterial(K,Dt);let Nt=st.index,Bt=1;if(K.wireframe===!0){if(Nt=V.getWireframeAttribute(st),Nt===void 0)return;Bt=2}let Kt=st.drawRange,se=st.attributes.position,Ut=Kt.start*Bt,he=(Kt.start+Kt.count)*Bt;Ct!==null&&(Ut=Math.max(Ut,Ct.start*Bt),he=Math.min(he,(Ct.start+Ct.count)*Bt)),Nt!==null?(Ut=Math.max(Ut,0),he=Math.min(he,Nt.count)):se!=null&&(Ut=Math.max(Ut,0),he=Math.min(he,se.count));let be=he-Ut;if(be<0||be===1/0)return;bt.setup(Q,K,wt,st,Nt);let ge,fe=Mt;if(Nt!==null&&(ge=B.get(Nt),fe=ut,fe.setIndex(ge)),Q.isMesh)K.wireframe===!0?(d.setLineWidth(K.wireframeLinewidth*at()),fe.setMode(b.LINES)):fe.setMode(b.TRIANGLES);else if(Q.isLine){let Ne=K.linewidth;Ne===void 0&&(Ne=1),d.setLineWidth(Ne*at()),Q.isLineSegments?fe.setMode(b.LINES):Q.isLineLoop?fe.setMode(b.LINE_LOOP):fe.setMode(b.LINE_STRIP)}else Q.isPoints?fe.setMode(b.POINTS):Q.isSprite&&fe.setMode(b.TRIANGLES);if(Q.isBatchedMesh)if(pt.get("WEBGL_multi_draw"))fe.renderMultiDraw(Q._multiDrawStarts,Q._multiDrawCounts,Q._multiDrawCount);else{let Ne=Q._multiDrawStarts,Lt=Q._multiDrawCounts,Ve=Q._multiDrawCount,ae=Nt?B.get(Nt).bytesPerElement:1,nn=X.get(K).currentProgram.getUniforms();for(let vn=0;vn<Ve;vn++)nn.setValue(b,"_gl_DrawID",vn),fe.render(Ne[vn]/ae,Lt[vn])}else if(Q.isInstancedMesh)fe.renderInstances(Ut,be,Q.count);else if(st.isInstancedBufferGeometry){let Ne=st._maxInstanceCount!==void 0?st._maxInstanceCount:1/0,Lt=Math.min(st.instanceCount,Ne);fe.renderInstances(Ut,be,Lt)}else fe.render(Ut,be)};function yc(v,G,st,K){O!==null&&v.isNodeMaterial&&O.setObject(K,v),$t===!0&&vt.setState(v,st,!1),v.transparent===!0&&v.side===on&&v.forceSinglePass===!1?(v.side=Ge,v.needsUpdate=!0,Hs(v,G,K),v.side=ai,v.needsUpdate=!0,Hs(v,G,K),v.side=on):Hs(v,G,K)}this.compile=function(v,G,st=null){st===null&&(st=v),O!==null&&O.renderStart(v,G,st),w=dt.get(st),w.init(G),x.push(w),st.traverseVisible(function(Q){Q.isLight&&Q.layers.test(G.layers)&&(w.pushLight(Q),Q.castShadow&&w.pushShadow(Q))}),v!==st&&v.traverseVisible(function(Q){Q.isLight&&Q.layers.test(G.layers)&&(w.pushLight(Q),Q.castShadow&&w.pushShadow(Q))}),w.setupLights(),O!==null&&O.updateLights(w.state.lightsArray),nt=this.localClippingEnabled,$t=vt.init(this.clippingPlanes,nt),$t===!0&&vt.setGlobalState(this.clippingPlanes,G),O!==null&&St.render(w.state.shadowsArray,st,G);let K=new Set;return v.traverse(function(Q){if(!(Q.isMesh||Q.isPoints||Q.isLine||Q.isSprite))return;let Ct=Q.material;if(Ct)if(Array.isArray(Ct))for(let Dt=0;Dt<Ct.length;Dt++){let wt=Ct[Dt];yc(wt,st,G,Q),K.add(wt)}else yc(Ct,st,G,Q),K.add(Ct)}),w=x.pop(),O!==null&&O.renderEnd(),K},this.compileAsync=function(v,G,st=null){let K=this.compile(v,G,st);return new Promise(Q=>{function Ct(){if(K.forEach(function(Dt){let Nt=X.get(Dt).currentProgram;(Nt===void 0||Nt.isReady())&&K.delete(Dt)}),K.size===0){Q(v);return}setTimeout(Ct,10)}pt.get("KHR_parallel_shader_compile")!==null?Ct():setTimeout(Ct,10)})};let Va=null;function Ph(v){Va&&Va(v)}function Mc(){di.stop()}function Sc(){di.start()}let di=new ih;di.setAnimationLoop(Ph),typeof self<"u"&&di.setContext(self),this.setAnimationLoop=function(v){Va=v,Ot.setAnimationLoop(v),v===null?di.stop():di.start()},Ot.addEventListener("sessionstart",Mc),Ot.addEventListener("sessionend",Sc),this.render=function(v,G){if(G!==void 0&&G.isCamera!==!0){qt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(q===!0)return;O!==null&&O.renderStart(v,G);let st=Ot.enabled===!0&&Ot.isPresenting===!0,K=C!==null&&(ct===null||st)&&C.begin(F,ct);if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),Ot.enabled===!0&&Ot.isPresenting===!0&&(C===null||C.isCompositing()===!1)&&(Ot.cameraAutoUpdate===!0&&Ot.updateCamera(G),G=Ot.getCamera()),v.isScene===!0&&v.onBeforeRender(F,v,G,ct),w=dt.get(v,x.length),w.init(G),w.state.textureUnits=J.getTextureUnits(),x.push(w),y.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),Ht.setFromProjectionMatrix(y,pn,G.reversedDepth),nt=this.localClippingEnabled,$t=vt.init(this.clippingPlanes,nt),A=lt.get(v,L.length),A.init(),L.push(A),Ot.enabled===!0&&Ot.isPresenting===!0){let Dt=F.xr.getDepthSensingMesh();Dt!==null&&Ga(Dt,G,-1/0,F.sortObjects)}Ga(v,G,0,F.sortObjects),A.finish(),O!==null&&O.updateLights(w.state.lightsArray),F.sortObjects===!0&&A.sort(At,Gt),W=Ot.enabled===!1||Ot.isPresenting===!1||Ot.hasDepthSensing()===!1,W&&kt.addToRenderList(A,v),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),$t===!0&&vt.beginShadows();let Q=w.state.shadowsArray;if(St.render(Q,v,G),$t===!0&&vt.endShadows(),(K&&C.hasRenderPass())===!1){let Dt=A.opaque,wt=A.transmissive;if(w.setupLights(),G.isArrayCamera){let Nt=G.cameras;if(wt.length>0)for(let Bt=0,Kt=Nt.length;Bt<Kt;Bt++){let se=Nt[Bt];Ec(Dt,wt,v,se)}W&&kt.render(v);for(let Bt=0,Kt=Nt.length;Bt<Kt;Bt++){let se=Nt[Bt];bc(A,v,se,se.viewport)}}else wt.length>0&&Ec(Dt,wt,v,G),W&&kt.render(v),bc(A,v,G)}ct!==null&&k===0&&(J.updateMultisampleRenderTarget(ct),J.updateRenderTargetMipmap(ct)),K&&C.end(F),v.isScene===!0&&v.onAfterRender(F,v,G),bt.resetDefaultState(),ot=-1,j=null,x.pop(),x.length>0?(w=x[x.length-1],J.setTextureUnits(w.state.textureUnits),$t===!0&&vt.setGlobalState(F.clippingPlanes,w.state.camera)):w=null,L.pop(),L.length>0?A=L[L.length-1]:A=null,O!==null&&O.renderEnd()};function Ga(v,G,st,K){if(v.visible===!1)return;if(v.layers.test(G.layers)){if(v.isGroup)st=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(G);else if(v.isLightProbeGrid)w.pushLightProbeGrid(v);else if(v.isLight)w.pushLight(v),v.castShadow&&w.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||v.intersectsFrustum(Ht)){K&&z.setFromMatrixPosition(v.matrixWorld).applyMatrix4(y);let Dt=Y.update(v),wt=v.material;wt.visible&&A.push(v,Dt,wt,st,z.z,null,G)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||v.intersectsFrustum(Ht))){let Dt=Y.update(v),wt=v.material;if(K&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),z.copy(v.boundingSphere.center)):(Dt.boundingSphere===null&&Dt.computeBoundingSphere(),z.copy(Dt.boundingSphere.center)),z.applyMatrix4(v.matrixWorld).applyMatrix4(y)),Array.isArray(wt)){let Nt=Dt.groups;for(let Bt=0,Kt=Nt.length;Bt<Kt;Bt++){let se=Nt[Bt],Ut=wt[se.materialIndex];Ut&&Ut.visible&&A.push(v,Dt,Ut,st,z.z,se,G)}}else wt.visible&&A.push(v,Dt,wt,st,z.z,null,G)}}let Ct=v.children;for(let Dt=0,wt=Ct.length;Dt<wt;Dt++)Ga(Ct[Dt],G,st,K)}function bc(v,G,st,K){let{opaque:Q,transmissive:Ct,transparent:Dt}=v;w.setupLightsView(st),$t===!0&&vt.setGlobalState(F.clippingPlanes,st),K&&d.viewport(rt.copy(K)),Q.length>0&&Gs(Q,G,st),Ct.length>0&&Gs(Ct,G,st),Dt.length>0&&Gs(Dt,G,st),d.buffers.depth.setTest(!0),d.buffers.depth.setMask(!0),d.buffers.color.setMask(!0),d.setPolygonOffset(!1)}function Ec(v,G,st,K){if((st.isScene===!0?st.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[K.id]===void 0){let Ut=pt.has("EXT_color_buffer_half_float")||pt.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[K.id]=new Ae(1,1,{generateMipmaps:!0,type:Ut?tn:je,minFilter:ci,samples:Math.max(4,M.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ee.workingColorSpace})}let Ct=w.state.transmissionRenderTarget[K.id],Dt=K.viewport||rt;Ct.setSize(Dt.z*F.transmissionResolutionScale,Dt.w*F.transmissionResolutionScale);let wt=F.getRenderTarget(),Nt=F.getActiveCubeFace(),Bt=F.getActiveMipmapLevel();F.setRenderTarget(Ct),F.getClearColor(ie),Vt=F.getClearAlpha(),Vt<1&&F.setClearColor(16777215,.5),F.clear(),W&&kt.render(st);let Kt=F.toneMapping;F.toneMapping=mn;let se=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),w.setupLightsView(K),$t===!0&&vt.setGlobalState(F.clippingPlanes,K),Gs(v,st,K),J.updateMultisampleRenderTarget(Ct),J.updateRenderTargetMipmap(Ct),pt.has("WEBGL_multisampled_render_to_texture")===!1){let Ut=!1;for(let he=0,be=G.length;he<be;he++){let ge=G[he],{object:fe,geometry:Ne,material:Lt,group:Ve}=ge;if(Lt.side===on&&fe.layers.test(K.layers)){let ae=Lt.side;Lt.side=Ge,Lt.needsUpdate=!0,Tc(fe,st,K,Ne,Lt,Ve),Lt.side=ae,Lt.needsUpdate=!0,Ut=!0}}Ut===!0&&(J.updateMultisampleRenderTarget(Ct),J.updateRenderTargetMipmap(Ct))}F.setRenderTarget(wt,Nt,Bt),F.setClearColor(ie,Vt),se!==void 0&&(K.viewport=se),F.toneMapping=Kt}function Gs(v,G,st){let K=G.isScene===!0?G.overrideMaterial:null;for(let Q=0,Ct=v.length;Q<Ct;Q++){let Dt=v[Q],{object:wt,geometry:Nt,group:Bt}=Dt,Kt=Dt.material;Kt.allowOverride===!0&&K!==null&&(Kt=K),wt.layers.test(st.layers)&&Tc(wt,G,st,Nt,Kt,Bt)}}function Tc(v,G,st,K,Q,Ct){O!==null&&Q.isNodeMaterial&&O.setObject(v,Q),v.onBeforeRender(F,G,st,K,Q,Ct),v.modelViewMatrix.multiplyMatrices(st.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),Q.onBeforeRender(F,G,st,K,v,Ct),Q.transparent===!0&&Q.side===on&&Q.forceSinglePass===!1?(Q.side=Ge,Q.needsUpdate=!0,F.renderBufferDirect(st,G,K,Q,v,Ct),Q.side=ai,Q.needsUpdate=!0,F.renderBufferDirect(st,G,K,Q,v,Ct),Q.side=on):F.renderBufferDirect(st,G,K,Q,v,Ct),v.onAfterRender(F,G,st,K,Q,Ct)}function Hs(v,G,st){G.isScene!==!0&&(G=$);let K=X.get(v),Q=w.state.lights,Ct=w.state.shadowsArray,Dt=Q.state.version,wt=ft.getParameters(v,Q.state,Ct,G,st,w.state.lightProbeGridArray),Nt=ft.getProgramCacheKey(wt),Bt=K.programs;K.environment=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?G.environment:null,K.fog=G.fog;let Kt=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap;K.envMap=mt.get(v.envMap||K.environment,Kt),K.envMapRotation=K.environment!==null&&v.envMap===null?G.environmentRotation:v.envMapRotation,Bt===void 0&&(v.addEventListener("dispose",xn),Bt=new Map,K.programs=Bt);let se=Bt.get(Nt);if(se!==void 0){if(K.currentProgram===se&&K.lightsStateVersion===Dt)return Ac(v,wt),se}else wt.uniforms=ft.getUniforms(v),O!==null&&v.isNodeMaterial&&O.build(v,st,wt),v.onBeforeCompile(wt,F),se=ft.acquireProgram(wt,Nt),Bt.set(Nt,se),K.uniforms=wt.uniforms;let Ut=K.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(Ut.clippingPlanes=vt.uniform),Ac(v,wt),K.needsLights=Uh(v),K.lightsStateVersion=Dt,K.needsLights&&(Ut.ambientLightColor.value=Q.state.ambient,Ut.lightProbe.value=Q.state.probe,Ut.sunLights.value=Q.state.sun,Ut.sunLightShadows.value=Q.state.sunShadow,Ut.directionalLights.value=Q.state.directional,Ut.directionalLightShadows.value=Q.state.directionalShadow,Ut.spotLights.value=Q.state.spot,Ut.spotLightShadows.value=Q.state.spotShadow,Ut.rectAreaLights.value=Q.state.rectArea,Ut.ltc_1.value=Q.state.rectAreaLTC1,Ut.ltc_2.value=Q.state.rectAreaLTC2,Ut.pointLights.value=Q.state.point,Ut.pointLightShadows.value=Q.state.pointShadow,Ut.hemisphereLights.value=Q.state.hemi,Ut.sunShadowMatrix.value=Q.state.sunShadowMatrix,Ut.sunShadowCascade.value=Q.state.sunShadowCascade,Ut.directionalShadowMatrix.value=Q.state.directionalShadowMatrix,Ut.spotLightMatrix.value=Q.state.spotLightMatrix,Ut.spotLightMap.value=Q.state.spotLightMap,Ut.pointShadowMatrix.value=Q.state.pointShadowMatrix),K.lightProbeGrid=w.state.lightProbeGridArray.length>0,K.currentProgram=se,K.uniformsList=null,se}function wc(v){if(v.uniformsList===null){let G=v.currentProgram.getUniforms();v.uniformsList=rs.seqWithValue(G.seq,v.uniforms)}return v.uniformsList}function Ac(v,G){let st=X.get(v);st.outputColorSpace=G.outputColorSpace,st.batching=G.batching,st.batchingColor=G.batchingColor,st.instancing=G.instancing,st.instancingColor=G.instancingColor,st.instancingMorph=G.instancingMorph,st.skinning=G.skinning,st.morphTargets=G.morphTargets,st.morphNormals=G.morphNormals,st.morphColors=G.morphColors,st.morphTargetsCount=G.morphTargetsCount,st.numClippingPlanes=G.numClippingPlanes,st.numIntersection=G.numClipIntersection,st.vertexAlphas=G.vertexAlphas,st.vertexTangents=G.vertexTangents,st.toneMapping=G.toneMapping}function Lh(v,G){if(v.length===0)return null;if(v.length===1)return v[0].texture!==null?v[0]:null;S.setFromMatrixPosition(G.matrixWorld);for(let st=0,K=v.length;st<K;st++){let Q=v[st];if(Q.texture!==null&&Q.boundingBox.containsPoint(S))return Q}return null}function Dh(v,G,st,K,Q){G.isScene!==!0&&(G=$),J.resetTextureUnits();let Ct=G.fog,Dt=K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial?G.environment:null,wt=ct===null?F.outputColorSpace:ct.isXRRenderTarget===!0?ct.texture.colorSpace:ee.workingColorSpace,Nt=K.isMeshStandardMaterial||K.isMeshLambertMaterial&&!K.envMap||K.isMeshPhongMaterial&&!K.envMap,Bt=mt.get(K.envMap||Dt,Nt),Kt=K.vertexColors===!0&&!!st.attributes.color&&st.attributes.color.itemSize===4,se=!!st.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),Ut=!!st.morphAttributes.position,he=!!st.morphAttributes.normal,be=!!st.morphAttributes.color,ge=mn;K.toneMapped&&(ct===null||ct.isXRRenderTarget===!0)&&(ge=F.toneMapping);let fe=st.morphAttributes.position||st.morphAttributes.normal||st.morphAttributes.color,Ne=fe!==void 0?fe.length:0,Lt=X.get(K),Ve=w.state.lights;if($t===!0&&(nt===!0||v!==j)){let me=v===j&&K.id===ot;vt.setState(K,v,me)}let ae=!1;K.version===Lt.__version?(Lt.needsLights&&Lt.lightsStateVersion!==Ve.state.version||Lt.outputColorSpace!==wt||Q.isBatchedMesh&&Lt.batching===!1||!Q.isBatchedMesh&&Lt.batching===!0||Q.isBatchedMesh&&Lt.batchingColor===!0&&Q._colorsTexture===null||Q.isBatchedMesh&&Lt.batchingColor===!1&&Q._colorsTexture!==null||Q.isInstancedMesh&&Lt.instancing===!1||!Q.isInstancedMesh&&Lt.instancing===!0||Q.isSkinnedMesh&&Lt.skinning===!1||!Q.isSkinnedMesh&&Lt.skinning===!0||Q.isInstancedMesh&&Lt.instancingColor===!0&&Q.instanceColor===null||Q.isInstancedMesh&&Lt.instancingColor===!1&&Q.instanceColor!==null||Q.isInstancedMesh&&Lt.instancingMorph===!0&&Q.morphTexture===null||Q.isInstancedMesh&&Lt.instancingMorph===!1&&Q.morphTexture!==null||Lt.envMap!==Bt||K.fog===!0&&Lt.fog!==Ct||Lt.numClippingPlanes!==void 0&&(Lt.numClippingPlanes!==vt.numPlanes||Lt.numIntersection!==vt.numIntersection)||Lt.vertexAlphas!==Kt||Lt.vertexTangents!==se||Lt.morphTargets!==Ut||Lt.morphNormals!==he||Lt.morphColors!==be||Lt.toneMapping!==ge||Lt.morphTargetsCount!==Ne||!!Lt.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(ae=!0):(ae=!0,Lt.__version=K.version);let nn=Lt.currentProgram;ae===!0&&(nn=Hs(K,G,Q),O&&K.isNodeMaterial&&O.onUpdateProgram(K,nn,Lt));let vn=!1,Wn=!1,Ri=!1,de=nn.getUniforms(),ye=Lt.uniforms;if(d.useProgram(nn.program)&&(vn=!0,Wn=!0,Ri=!0),K.id!==ot&&(ot=K.id,Wn=!0),Lt.needsLights){let me=Lh(w.state.lightProbeGridArray,Q);Lt.lightProbeGrid!==me&&(Lt.lightProbeGrid=me,Wn=!0)}if(vn||j!==v){d.buffers.depth.getReversed()&&v.reversedDepth!==!0&&(v._reversedDepth=!0,v.updateProjectionMatrix()),de.setValue(b,"projectionMatrix",v.projectionMatrix),de.setValue(b,"viewMatrix",v.matrixWorldInverse);let qn=de.map.cameraPosition;qn!==void 0&&qn.setValue(b,I.setFromMatrixPosition(v.matrixWorld)),M.logarithmicDepthBuffer&&de.setValue(b,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&de.setValue(b,"isOrthographic",v.isOrthographicCamera===!0),j!==v&&(j=v,Wn=!0,Ri=!0)}if(Lt.needsLights&&(Ve.state.sunShadowMap.length>0&&de.setValue(b,"sunShadowMap",Ve.state.sunShadowMap,J),Ve.state.directionalShadowMap.length>0&&de.setValue(b,"directionalShadowMap",Ve.state.directionalShadowMap,J),Ve.state.spotShadowMap.length>0&&de.setValue(b,"spotShadowMap",Ve.state.spotShadowMap,J),Ve.state.pointShadowMap.length>0&&de.setValue(b,"pointShadowMap",Ve.state.pointShadowMap,J)),Q.isSkinnedMesh){de.setOptional(b,Q,"bindMatrix"),de.setOptional(b,Q,"bindMatrixInverse");let me=Q.skeleton;me&&(me.boneTexture===null&&me.computeBoneTexture(),de.setValue(b,"boneTexture",me.boneTexture,J))}Q.isBatchedMesh&&(de.setOptional(b,Q,"batchingTexture"),de.setValue(b,"batchingTexture",Q._matricesTexture,J),de.setOptional(b,Q,"batchingIdTexture"),de.setValue(b,"batchingIdTexture",Q._indirectTexture,J),de.setOptional(b,Q,"batchingColorTexture"),Q._colorsTexture!==null&&de.setValue(b,"batchingColorTexture",Q._colorsTexture,J));let Xn=st.morphAttributes;if((Xn.position!==void 0||Xn.normal!==void 0||Xn.color!==void 0)&&N.update(Q,st,nn),(Wn||Lt.receiveShadow!==Q.receiveShadow)&&(Lt.receiveShadow=Q.receiveShadow,de.setValue(b,"receiveShadow",Q.receiveShadow)),(K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial)&&K.envMap===null&&G.environment!==null&&(ye.envMapIntensity.value=G.environmentIntensity),ye.dfgLUT!==void 0&&(ye.dfgLUT.value=om()),Wn){if(de.setValue(b,"toneMappingExposure",F.toneMappingExposure),Lt.needsLights&&Nh(ye,Ri),Ct&&K.fog===!0&&xt.refreshFogUniforms(ye,Ct),xt.refreshMaterialUniforms(ye,K,ht,it,w.state.transmissionRenderTarget[v.id]),Lt.needsLights&&Lt.lightProbeGrid){let me=Lt.lightProbeGrid;ye.probesSH.value=me.texture,ye.probesMin.value.copy(me.boundingBox.min),ye.probesMax.value.copy(me.boundingBox.max),ye.probesResolution.value.copy(me.resolution)}rs.upload(b,wc(Lt),ye,J)}if(K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(rs.upload(b,wc(Lt),ye,J),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&de.setValue(b,"center",Q.center),de.setValue(b,"modelViewMatrix",Q.modelViewMatrix),de.setValue(b,"normalMatrix",Q.normalMatrix),de.setValue(b,"modelMatrix",Q.matrixWorld),K.uniformsGroups!==void 0){let me=K.uniformsGroups;for(let qn=0,Ii=me.length;qn<Ii;qn++){let Rc=me[qn];gt.update(Rc,nn),gt.bind(Rc,nn)}}return nn}function Nh(v,G){v.ambientLightColor.needsUpdate=G,v.lightProbe.needsUpdate=G,v.sunLights.needsUpdate=G,v.sunLightShadows.needsUpdate=G,v.directionalLights.needsUpdate=G,v.directionalLightShadows.needsUpdate=G,v.pointLights.needsUpdate=G,v.pointLightShadows.needsUpdate=G,v.spotLights.needsUpdate=G,v.spotLightShadows.needsUpdate=G,v.rectAreaLights.needsUpdate=G,v.hemisphereLights.needsUpdate=G}function Uh(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return et},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return ct},this.setRenderTargetTextures=function(v,G,st){let K=X.get(v);K.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,K.__autoAllocateDepthBuffer===!1&&(K.__useRenderToTexture=!1),X.get(v.texture).__webglTexture=G,X.get(v.depthTexture).__webglTexture=K.__autoAllocateDepthBuffer?void 0:st,K.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,G){let st=X.get(v);st.__webglFramebuffer=G,st.__useDefaultFramebuffer=G===void 0},this.setRenderTarget=function(v,G=0,st=0){ct=v,et=G,k=st;let K=null,Q=!1,Ct=!1;if(v){let wt=X.get(v);if(wt.__useDefaultFramebuffer!==void 0){d.bindFramebuffer(b.FRAMEBUFFER,wt.__webglFramebuffer),rt.copy(v.viewport),It.copy(v.scissor),Pt=v.scissorTest,d.viewport(rt),d.scissor(It),d.setScissorTest(Pt),ot=-1;return}else if(wt.__webglFramebuffer===void 0)J.setupRenderTarget(v);else if(wt.__hasExternalTextures)J.rebindTextures(v,X.get(v.texture).__webglTexture,X.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){let Kt=v.depthTexture;if(wt.__boundDepthTexture!==Kt){if(Kt!==null&&X.has(Kt)&&(v.width!==Kt.image.width||v.height!==Kt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");J.setupDepthRenderbuffer(v)}}let Nt=v.texture;(Nt.isData3DTexture||Nt.isDataArrayTexture||Nt.isCompressedArrayTexture)&&(Ct=!0);let Bt=X.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(Bt[G])?K=Bt[G][st]:K=Bt[G],Q=!0):v.samples>0&&J.useMultisampledRTT(v)===!1?K=X.get(v).__webglMultisampledFramebuffer:Array.isArray(Bt)?K=Bt[st]:K=Bt,rt.copy(v.viewport),It.copy(v.scissor),Pt=v.scissorTest}else rt.copy(Et).multiplyScalar(ht).floor(),It.copy(Xt).multiplyScalar(ht).floor(),Pt=ce;if(st!==0&&(K=Z),d.bindFramebuffer(b.FRAMEBUFFER,K)&&d.drawBuffers(v,K),d.viewport(rt),d.scissor(It),d.setScissorTest(Pt),Q){let wt=X.get(v.texture);b.framebufferTexture2D(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_CUBE_MAP_POSITIVE_X+G,wt.__webglTexture,st)}else if(Ct){let wt=G;for(let Nt=0;Nt<v.textures.length;Nt++){let Bt=X.get(v.textures[Nt]);b.framebufferTextureLayer(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0+Nt,Bt.__webglTexture,st,wt)}}else if(v!==null&&st!==0){let wt=X.get(v.texture);b.framebufferTexture2D(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_2D,wt.__webglTexture,st)}ot=-1};function Cc(v){let G=X.get(v);return(G.__readFormat!==v.format||G.__readType!==v.type)&&(G.__readFormat=v.format,G.__readType=v.type,G.__formatReadable=M.textureFormatReadable(v.format),G.__typeReadable=M.textureTypeReadable(v.type)),G}this.readRenderTargetPixels=function(v,G,st,K,Q,Ct,Dt,wt=0){if(!(v&&v.isWebGLRenderTarget)){qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Nt=X.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&Dt!==void 0&&(Nt=Nt[Dt]),Nt){d.bindFramebuffer(b.FRAMEBUFFER,Nt);try{let Bt=v.textures[wt],Kt=Bt.format,se=Bt.type;v.textures.length>1&&b.readBuffer(b.COLOR_ATTACHMENT0+wt);let Ut=Cc(Bt);if(Ut.__formatReadable===!1){qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ut.__typeReadable===!1){qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=v.width-K&&st>=0&&st<=v.height-Q&&b.readPixels(G,st,K,Q,yt.convert(Kt),yt.convert(se),Ct)}finally{let Bt=ct!==null?X.get(ct).__webglFramebuffer:null;d.bindFramebuffer(b.FRAMEBUFFER,Bt)}}},this.readRenderTargetPixelsAsync=async function(v,G,st,K,Q,Ct,Dt,wt=0){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Nt=X.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&Dt!==void 0&&(Nt=Nt[Dt]),Nt)if(G>=0&&G<=v.width-K&&st>=0&&st<=v.height-Q){d.bindFramebuffer(b.FRAMEBUFFER,Nt);let Bt=v.textures[wt],Kt=Bt.format,se=Bt.type;v.textures.length>1&&b.readBuffer(b.COLOR_ATTACHMENT0+wt);let Ut=Cc(Bt);if(Ut.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ut.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let he=b.createBuffer();b.bindBuffer(b.PIXEL_PACK_BUFFER,he),b.bufferData(b.PIXEL_PACK_BUFFER,Ct.byteLength,b.STREAM_READ),b.readPixels(G,st,K,Q,yt.convert(Kt),yt.convert(se),0),b.bindBuffer(b.PIXEL_PACK_BUFFER,null);let be=ct!==null?X.get(ct).__webglFramebuffer:null;d.bindFramebuffer(b.FRAMEBUFFER,be);let ge=b.fenceSync(b.SYNC_GPU_COMMANDS_COMPLETE,0);return b.flush(),await Il(b,ge,4),b.bindBuffer(b.PIXEL_PACK_BUFFER,he),b.getBufferSubData(b.PIXEL_PACK_BUFFER,0,Ct),b.bindBuffer(b.PIXEL_PACK_BUFFER,null),b.deleteBuffer(he),b.deleteSync(ge),Ct}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(v,G=null,st=0){let K=Math.pow(2,-st),Q=Math.floor(v.image.width*K),Ct=Math.floor(v.image.height*K),Dt=G!==null?G.x:0,wt=G!==null?G.y:0;J.setTexture2D(v,0),b.copyTexSubImage2D(b.TEXTURE_2D,st,0,0,Dt,wt,Q,Ct),d.unbindTexture()},this.copyTextureToTexture=function(v,G,st=null,K=null,Q=0,Ct=0){let Dt,wt,Nt,Bt,Kt,se,Ut,he,be,ge=v.isCompressedTexture?v.mipmaps[Ct]:v.image;if(st!==null)Dt=st.max.x-st.min.x,wt=st.max.y-st.min.y,Nt=st.isBox3?st.max.z-st.min.z:1,Bt=st.min.x,Kt=st.min.y,se=st.isBox3?st.min.z:0;else{let ye=Math.pow(2,-Q);Dt=Math.floor(ge.width*ye),wt=Math.floor(ge.height*ye),v.isDataArrayTexture?Nt=ge.depth:v.isData3DTexture?Nt=Math.floor(ge.depth*ye):Nt=1,Bt=0,Kt=0,se=0}K!==null?(Ut=K.x,he=K.y,be=K.z):(Ut=0,he=0,be=0);let fe=yt.convert(G.format),Ne=yt.convert(G.type),Lt;G.isData3DTexture?(J.setTexture3D(G,0),Lt=b.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(J.setTexture2DArray(G,0),Lt=b.TEXTURE_2D_ARRAY):(J.setTexture2D(G,0),Lt=b.TEXTURE_2D),d.activeTexture(b.TEXTURE0),d.pixelStorei(b.UNPACK_FLIP_Y_WEBGL,G.flipY),d.pixelStorei(b.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),d.pixelStorei(b.UNPACK_ALIGNMENT,G.unpackAlignment);let Ve=d.getParameter(b.UNPACK_ROW_LENGTH),ae=d.getParameter(b.UNPACK_IMAGE_HEIGHT),nn=d.getParameter(b.UNPACK_SKIP_PIXELS),vn=d.getParameter(b.UNPACK_SKIP_ROWS),Wn=d.getParameter(b.UNPACK_SKIP_IMAGES);d.pixelStorei(b.UNPACK_ROW_LENGTH,ge.width),d.pixelStorei(b.UNPACK_IMAGE_HEIGHT,ge.height),d.pixelStorei(b.UNPACK_SKIP_PIXELS,Bt),d.pixelStorei(b.UNPACK_SKIP_ROWS,Kt),d.pixelStorei(b.UNPACK_SKIP_IMAGES,se);let Ri=v.isDataArrayTexture||v.isData3DTexture,de=G.isDataArrayTexture||G.isData3DTexture;if(v.isDepthTexture){let ye=X.get(v),Xn=X.get(G),me=X.get(ye.__renderTarget),qn=X.get(Xn.__renderTarget);d.bindFramebuffer(b.READ_FRAMEBUFFER,me.__webglFramebuffer),d.bindFramebuffer(b.DRAW_FRAMEBUFFER,qn.__webglFramebuffer);for(let Ii=0;Ii<Nt;Ii++)Ri&&(b.framebufferTextureLayer(b.READ_FRAMEBUFFER,b.COLOR_ATTACHMENT0,X.get(v).__webglTexture,Q,se+Ii),b.framebufferTextureLayer(b.DRAW_FRAMEBUFFER,b.COLOR_ATTACHMENT0,X.get(G).__webglTexture,Ct,be+Ii)),b.blitFramebuffer(Bt,Kt,Dt,wt,Ut,he,Dt,wt,b.DEPTH_BUFFER_BIT,b.NEAREST);d.bindFramebuffer(b.READ_FRAMEBUFFER,null),d.bindFramebuffer(b.DRAW_FRAMEBUFFER,null)}else if(Q!==0||v.isRenderTargetTexture||X.has(v)){let ye=X.get(v),Xn=X.get(G);d.bindFramebuffer(b.READ_FRAMEBUFFER,D),d.bindFramebuffer(b.DRAW_FRAMEBUFFER,H);for(let me=0;me<Nt;me++)Ri?b.framebufferTextureLayer(b.READ_FRAMEBUFFER,b.COLOR_ATTACHMENT0,ye.__webglTexture,Q,se+me):b.framebufferTexture2D(b.READ_FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_2D,ye.__webglTexture,Q),de?b.framebufferTextureLayer(b.DRAW_FRAMEBUFFER,b.COLOR_ATTACHMENT0,Xn.__webglTexture,Ct,be+me):b.framebufferTexture2D(b.DRAW_FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_2D,Xn.__webglTexture,Ct),Q!==0?b.blitFramebuffer(Bt,Kt,Dt,wt,Ut,he,Dt,wt,b.COLOR_BUFFER_BIT,b.NEAREST):de?b.copyTexSubImage3D(Lt,Ct,Ut,he,be+me,Bt,Kt,Dt,wt):b.copyTexSubImage2D(Lt,Ct,Ut,he,Bt,Kt,Dt,wt);d.bindFramebuffer(b.READ_FRAMEBUFFER,null),d.bindFramebuffer(b.DRAW_FRAMEBUFFER,null)}else de?v.isDataTexture||v.isData3DTexture?b.texSubImage3D(Lt,Ct,Ut,he,be,Dt,wt,Nt,fe,Ne,ge.data):G.isCompressedArrayTexture?b.compressedTexSubImage3D(Lt,Ct,Ut,he,be,Dt,wt,Nt,fe,ge.data):b.texSubImage3D(Lt,Ct,Ut,he,be,Dt,wt,Nt,fe,Ne,ge):v.isDataTexture?b.texSubImage2D(b.TEXTURE_2D,Ct,Ut,he,Dt,wt,fe,Ne,ge.data):v.isCompressedTexture?b.compressedTexSubImage2D(b.TEXTURE_2D,Ct,Ut,he,ge.width,ge.height,fe,ge.data):b.texSubImage2D(b.TEXTURE_2D,Ct,Ut,he,Dt,wt,fe,Ne,ge);d.pixelStorei(b.UNPACK_ROW_LENGTH,Ve),d.pixelStorei(b.UNPACK_IMAGE_HEIGHT,ae),d.pixelStorei(b.UNPACK_SKIP_PIXELS,nn),d.pixelStorei(b.UNPACK_SKIP_ROWS,vn),d.pixelStorei(b.UNPACK_SKIP_IMAGES,Wn),Ct===0&&G.generateMipmaps&&b.generateMipmap(Lt),d.unbindTexture()},this.initRenderTarget=function(v){X.get(v).__webglFramebuffer===void 0&&J.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?J.setTextureCube(v,0):v.isData3DTexture?J.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?J.setTexture2DArray(v,0):J.setTexture2D(v,0),d.unbindTexture()},this.resetState=function(){et=0,k=0,ct=null,d.reset(),bt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return pn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=ee._getDrawingBufferColorSpace(t),e.unpackColorSpace=ee._getUnpackColorSpace()}};var Cn=Math.PI*2,De=(i,t=0,e=1)=>i<t?t:i>e?e:i,Ft=(i,t,e)=>i+(t-i)*e,te=(i,t,e)=>De((e-i)/(t-i)),Yt=(i,t,e)=>{let n=te(i,t,e);return n*n*(3-2*n)};var kn=i=>i-Math.floor(i),Rt={lin:i=>i,quadIn:i=>i*i,quadOut:i=>1-(1-i)*(1-i),quadInOut:i=>i<.5?2*i*i:1-Math.pow(-2*i+2,2)/2,cubicIn:i=>i*i*i,cubicOut:i=>1-Math.pow(1-i,3),cubicInOut:i=>i<.5?4*i*i*i:1-Math.pow(-2*i+2,3)/2,quartOut:i=>1-Math.pow(1-i,4),quartInOut:i=>i<.5?8*i*i*i*i:1-Math.pow(-2*i+2,4)/2,quintOut:i=>1-Math.pow(1-i,5),quintInOut:i=>i<.5?16*i*i*i*i*i:1-Math.pow(-2*i+2,5)/2,expoIn:i=>i<=0?0:Math.pow(2,10*i-10),expoOut:i=>i>=1?1:1-Math.pow(2,-10*i),expoInOut:i=>i<=0?0:i>=1?1:i<.5?Math.pow(2,20*i-10)/2:(2-Math.pow(2,-20*i+10))/2,sineInOut:i=>-(Math.cos(Math.PI*i)-1)/2,backOut:(i,t=1.70158)=>1+(t+1)*Math.pow(i-1,3)+t*Math.pow(i-1,2),backIn:(i,t=1.70158)=>(t+1)*i*i*i-t*i*i,spring:(i,t=7,e=.42)=>i>=1?1:1-Math.exp(-e*t*i*1.6)*Math.cos(t*i*Math.sqrt(1-e*e)*1.2)},Rn=(i,t,e,n=Rt.lin)=>n(te(t,e,i));function Vn(i){let t=i>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Se(i){let t=(i|0)*374761393+668265263;return t=Math.imul(t^t>>>13,1274126177),((t^t>>>16)>>>0)/4294967296}var fc=(i,t=0)=>Math.sin(i*1.31+t*7.1)*.5+Math.sin(i*2.17+t*3.3+1.7)*.3+Math.sin(i*3.73+t*5.9+4.1)*.2,os=(i,t,e,n,s)=>{let r=1-s;return r*r*r*i+3*r*r*s*t+3*r*s*s*e+s*s*s*n},Ba=(i,t,e,n)=>{let s=1-n;return s*s*i+2*s*n*t+n*n*e};function ui(i){return t=>{if(t<=i[0][0])return i[0][1];for(let e=1;e<i.length;e++){let[n,s,r=Rt.cubicInOut]=i[e],[a,o]=i[e-1];if(t<=n){let c=r(te(a,n,t));return Array.isArray(o)?o.map((l,u)=>Ft(l,s[u],c)):Ft(o,s,c)}}return i[i.length-1][1]}}function hh(i){let t=Vn(4242),[e,n,s]=i,r=[],a=[],o=(h,m,_,T,p)=>(r.push({p:[h,m,_],kind:T,cluster:p,deg:0}),r.length-1),c=o(e,n,s,0,-1),l=[];for(let h=0;h<6;h++){let m=h/6*Cn+.35,_=(h%2?1:-1)*150,T=e+Math.cos(m)*390,p=n+_+Math.sin(m*2)*40,f=s+Math.sin(m)*330;l.push(o(T,p,f,1,h))}let u=[];for(let h=0;h<6;h++){let[m,_,T]=r[l[h]].p,p=[];for(let f=0;f<6;f++){let R=t()*Cn,P=Math.acos(2*t()-1),S=85+t()*70,A=m-e,w=_-n,L=T-s,x=Math.hypot(A,w,L)||1,C=m+Math.sin(P)*Math.cos(R)*S+A/x*60,F=_+Math.cos(P)*S*.8+w/x*60,q=T+Math.sin(P)*Math.sin(R)*S+L/x*60;p.push(o(C,F,q,2,h))}u.push(p)}for(let h=0;h<40;h++)for(let m=1;m<r.length;m++)for(let _=m+1;_<r.length;_++){let T=r[m].p,p=r[_].p,f=p[0]-T[0],R=p[1]-T[1],P=p[2]-T[2],S=Math.hypot(f,R,P)||1,A=95;if(S<A){let w=(A-S)/S*.25;r[m].kind===2&&(T[0]-=f*w,T[1]-=R*w,T[2]-=P*w),r[_].kind===2&&(p[0]+=f*w,p[1]+=R*w,p[2]+=P*w)}}let g=(h,m)=>{a.push([h,m]),r[h].deg++,r[m].deg++};for(let h=0;h<6;h++){g(c,l[h]);let m=u[h];m.forEach(_=>g(l[h],_)),g(m[0],m[3]),g(m[1],m[4])}for(let h=0;h<6;h++)g(l[h],l[(h+1)%6]);for(let h=0;h<6;h++)g(u[h][Math.floor(t()*6)],u[(h+1)%6][Math.floor(t()*6)]);return{nodes:r,edges:a,hub:c,centres:l,leaves:u}}var Ye=288,ve=96,mc=Ye,gc=Ye+1,Gn=Ye+2,Le=[.035,.1,1],en=[.82,.88,1],uh=[[.85,.89,1],[1,.8,.62],[.62,.86,1],[.8,.74,1],[.6,.62,.68],[.95,.95,.95],[1,.9,.8]],pc=[1,.32,.12],za=.58;function dh(i={}){let t=!!i.portrait,e=Vn(1789),n=Pn.hub,s=Pn.glyphK,r=hh(n),{nodes:a,edges:o}=r,c=o.length,l=-1e9;for(let y of a)l=Math.max(l,y.p[0]);let u=[l+120,n[1]-10,n[2]],g=3200,h=.46,m=new Float64Array(a.length);m[r.hub]=E.graph-.05,r.centres.forEach((y,I)=>{m[y]=E.graph+I*.125,r.leaves[I].forEach((z,$)=>m[z]=E.graph+I*.125+.0625+$*.035)});let _=o.map(([y,I])=>{let z=a[y].kind,$=a[I].kind;return z===0||$===0?10:a[y].cluster===a[I].cluster?z===1||$===1?4:2:z===1&&$===1?5:2}),T=_.reduce((y,I)=>y+I,0),p=[];for(_.forEach((y,I)=>{let z=Math.max(1,Math.round(y/T*Ye));for(let $=0;$<z;$++)p.push(I)});p.length<Ye;)p.push(p.length%c);p.length=Ye;for(let y=Ye-1;y>0;y--){let I=Math.floor(e()*(y+1));[p[y],p[I]]=[p[I],p[y]]}let f=y=>y<E.graph-.05?.03:Ft(.03,1,Rt.backOut(te(E.graph-.05,E.graph+.85,y),1.15)),R=(y,I,z)=>{let $=a[y].p,W=f(I);return z[0]=n[0]+($[0]-n[0])*W,z[1]=n[1]+($[1]-n[1])*W,z[2]=n[2]+($[2]-n[2])*W,z},P=7,S=108,A=3e3,w=n[0]-A,L=[.22,.33,.44,.55,.66],x=y=>n[1]+(3-y)*S,C=(y,I)=>[w+A*L[y],x(I),n[2]],F=[],q=[[.5,22],[.75,34],[1,52],[1.25,76],[1.5,104]],O=[];q.forEach(([y,I])=>{for(let z=0;z<I;z++)O.push(y)});let Z=Array.from({length:Ye},(y,I)=>I);for(let y=Ye-1;y>0;y--){let I=Math.floor(e()*(y+1));[Z[y],Z[I]]=[Z[I],Z[y]]}for(let y=0;y<Ye;y++){let I=e,z={};z.C=[I()*2900-1450,I()*1750-875,I()*2700-2100];let $=.4+.36*I();z.f=[$,$*2.13,$*3.41];let W=.75+.5*I();z.A=[(330+170*I())*W,(160+90*I())*W,(60+40*I())*W,(240+120*I())*W,(120+70*I())*W,(50+30*I())*W,(420+220*I())*W,(200+100*I())*W,(80+50*I())*W],z.ph=Array.from({length:9},()=>I()*Cn),z.v=(.5+.7*I())*(I()<.5?-1:1),z.s0=I()*40,z.L=2+2.6*I(),z.b=.3+1.2*Math.pow(I(),2.2),z.w=1.3+2.8*I(),z.c=uh[Math.floor(I()*uh.length)],z.birth=O[y]+I()*.05,z.jit=I(),z.fa=y*2.399963+I()*.2,z.fR=170+1900*Math.sqrt(I()),z.fTw=.8+.35*I(),z.fph=I(),z.fsp=.3+.14*I(),z.dF=.32*De(Math.hypot(z.C[0],z.C[1]*1.5)/1700)+I()*.04,z.fb=.025+.34*Math.pow(I(),3),z.fpul=I()<.6?1:0,z.pl=y%P,z.po=(I()-.5)*16,z.pz=(I()-.5)*16,z.pay=30+70*I(),z.paz=90+200*I(),z.pf=2.5+4*I(),z.pph=I()*Cn,z.ppu=I(),z.dP=.25*I(),z.e=p[y];let[at,b]=o[z.e],_t=a[at].p,pt=a[b].p,M=[pt[0]-_t[0],pt[1]-_t[1],pt[2]-_t[2]],d=Math.hypot(...M)||1,U=[(_t[0]+pt[0])/2,(_t[1]+pt[1])/2,(_t[2]+pt[2])/2],X=[U[0]-n[0],U[1]-n[1],U[2]-n[2]],J=Math.hypot(...X)||1,mt=a[at].kind===1&&a[b].kind===1,B=a[at].cluster!==a[b].cluster&&a[at].kind!==0&&a[b].kind!==0,V=mt?.32:B?.08:.16;z.gC=[U[0]+X[0]/J*d*V,U[1]+X[1]/J*d*V,U[2]+X[2]/J*d*V],z.spoke=a[at].kind===0||a[b].kind===0;let Y=[I()-.5,I()-.5,I()-.5],ft=(Y[0]*M[0]+Y[1]*M[1]+Y[2]*M[2])/(d*d);Y=[Y[0]-M[0]*ft,Y[1]-M[1]*ft,Y[2]-M[2]*ft];let xt=Math.hypot(...Y)||1,lt=3+13*I();z.go=[Y[0]/xt*lt,Y[1]/xt*lt,Y[2]/xt*lt],z.gph=I(),z.gsp=.45+.5*I(),z.gT=E.graph-.55+.18*I(),z.tint=a[at].cluster<0?-1:a[at].cluster,z.bA=a[at].kind===0?b:at,z.bo=[(I()-.5)*60,(I()-.5)*60,(I()-.5)*60],z.dB=.28*De((u[0]-a[z.bA].p[0])/1300)+I()*.05,z.bph=I(),z.lg=y%3;let vt=Math.floor(y/3)%7;z.ld=-.6+1.2*vt/6+(I()-.5)*.02,z.lb=-1.38+2.76*(z.lg*7+vt)/20+(I()-.5)*.02,z.dL=.12*I()+.06*z.lg,z.lph=I(),z.lI=.7+.6*I(),F.push(z)}let D=new Float32Array(ve*Gn*4),H=new Float32Array(ve*Gn*4),et=new Float64Array(Gn*4),k=new Float64Array(8),ct=new Float64Array(8);function ot(y,I,z,$,W){let at=y.s0+y.v*$+y.L*I,b=y.f,_t=y.ph,pt=y.A,M=Math.sin(b[0]*at+_t[0]),d=Math.sin(b[1]*at+_t[1]),U=Math.sin(b[2]*at+_t[2]);W[0]=y.C[0]+pt[0]*M+pt[1]*d+pt[2]*U,W[1]=y.C[1]+pt[3]*Math.sin(b[0]*at+_t[3])+pt[4]*Math.sin(b[1]*at+_t[4])+pt[5]*Math.sin(b[2]*at+_t[5]),W[2]=y.C[2]+pt[6]*Math.sin(b[0]*at+_t[6])+pt[7]*Math.sin(b[1]*at+_t[7])+pt[8]*Math.sin(b[2]*at+_t[8]);let X=Rt.expoOut(te(y.birth,y.birth+.55,z)),J=y.b*(.08+.92*I*I)*Yt(1-X,1-X+.1,I)*te(y.birth,y.birth+.05,z);W[3]=J,W[4]=y.c[0],W[5]=y.c[1],W[6]=y.c[2],W[7]=y.w}function j(y,I,z,$,W){let at=Ft(1800,n[2],I),b=Math.pow(Yt(.3,1,I),1.15),_t=y.fR*(1-b),pt=y.fa+y.fTw*b*b;W[0]=n[0]+_t*Math.cos(pt),W[1]=n[1]+_t*Math.sin(pt),W[2]=at;let M=z-E.drop,d=kn(I-y.fsp*M+y.fph)-.5,U=y.fpul*Math.exp(-d*d*900);W[3]=y.fb+2.8*U+.28*b*b*b;let X=Math.pow(b,.8);W[4]=Ft(en[0],Le[0],X)+U*.5,W[5]=Ft(en[1],Le[1],X)+U*.5,W[6]=Ft(en[2],Le[2],X)+U*.3,W[7]=3}function rt(y,I,z,$,W){let at=w+A*I,b=0;for(let B of L)b+=Yt(B-.012,B+.012,I);b/=L.length;let _t=Rt.cubicInOut(te(.74,1,I)),pt=I*y.pf*Cn-(z-E.pipe)*5.5+y.pph,M=1-b,d=y.pay*(Math.sin(pt)+.5*Math.sin(pt*2.3+1.1))*M,U=y.paz*Math.sin(pt*.7+y.pph*2)*M;W[0]=at,W[1]=Ft(x(y.pl)+y.po+d,n[1]+y.po*.15,_t),W[2]=n[2]+U+y.pz*(1-_t);let X=kn(I-.42*(z-E.pipe)+y.ppu)-.5,J=Math.exp(-X*X*500)*b;W[3]=.1*M+.3*b+1.9*J+.5*_t;let mt=b*(.35+.65*_t);W[4]=Ft(y.c[0]*.8,Ft(en[0],Le[0],mt),b)+J*.4,W[5]=Ft(y.c[1]*.8,Ft(en[1],Le[1],mt),b)+J*.4,W[6]=Ft(y.c[2]*.8,Ft(en[2],Le[2],mt),b)+J*.2,W[7]=2.2}let It=[[.8,.88,1],[.72,.85,1],[.88,.86,1],[.8,.92,1],[.9,.9,1],[.76,.8,1]];function Pt(y,I,z,$,W){let[at,b]=o[y.e],_t=a[at].p,pt=a[b].p,M=y.gC,d=f(z),U=Math.sin(Math.PI*I)*d;W[0]=n[0]+(Ba(_t[0],M[0],pt[0],I)-n[0])*d+y.go[0]*U,W[1]=n[1]+(Ba(_t[1],M[1],pt[1],I)-n[1])*d+y.go[1]*U,W[2]=n[2]+(Ba(_t[2],M[2],pt[2],I)-n[2])*d+y.go[2]*U;let X=kn(I-y.gsp*(z-E.graph)+y.gph)-.5,J=Math.exp(-X*X*160);W[3]=(y.spoke?.32:.24)+1.9*J;let mt=y.spoke?[.3,.46,1]:y.tint<0?en:It[y.tint];W[4]=mt[0]+J*.45,W[5]=mt[1]+J*.4,W[6]=mt[2]+J*.1,W[7]=2.1}function ie(y,I,z,$,W){let at=a[y.bA].p,b=u[0],_t=u[1]+y.bo[1]*.1,pt=u[2]+y.bo[2]*.1;if(I<=h){let M=I/h,d=[at[0]+(b-at[0])*.35+y.bo[0],at[1]+(_t-at[1])*.35+y.bo[1],at[2]+(pt-at[2])*.35+y.bo[2]],U=[b-300,_t,pt];W[0]=os(at[0],d[0],U[0],b,M),W[1]=os(at[1],d[1],U[1],_t,M),W[2]=os(at[2],d[2],U[2],pt,M);let X=kn(M-1.1*(z-E.beam)+y.bph)-.5,J=Math.exp(-X*X*120);W[3]=.42+1.1*J+.5*M*M;let mt=M*M;W[4]=Ft(en[0],Le[0],mt)+J*.25,W[5]=Ft(en[1],Le[1],mt)+J*.25,W[6]=Ft(en[2],Le[2],mt)+J*.1,W[7]=2}else{let M=(I-h)/(1-h),d=(1-M)*(1-M)*(1-M);W[0]=b+g*M,W[1]=_t+y.bo[1]*.02*d,W[2]=pt+y.bo[2]*.02*d;let U=Rt.expoOut(te(E.beam+.04,E.beam+.8,z)),X=kn(M*2-1.6*(z-E.beam)+y.bph)-.5,J=Math.exp(-X*X*90);W[3]=(.62+.9*J)*Yt(U+.015,U-.015,M),W[4]=Le[0]+J*.12,W[5]=Le[1]+J*.18,W[6]=Le[2],W[7]=2.2}}let Vt=[n[0]-14*s,n[1]+10*s,n[2]];function Jt(y,I,z){if(y===1){z[0]=16*I,z[1]=10,z[2]=16,z[3]=0;return}let $=y===0?3:17;z[0]=os(0,8,10,16,I),z[1]=os($,$,10,10,I);let W=1-I;z[2]=3*W*W*8+6*W*I*2+3*I*I*6,z[3]=3*W*W*0+6*W*I*(10-$)+3*I*I*0}let it=new Float64Array(4);function ht(y,I,z,$,W){let at,b,_t;if(I<=za){let pt=I/za;Jt(y.lg,pt,it);let M=Math.hypot(it[2],it[3])||1,d=-it[3]/M,U=it[2]/M,X=1-Rt.cubicOut(te(E.fold+.3,E.fold+1.25,z)),J=Ft(y.ld,y.lb,Yt(.8,1,pt))+.07*X*Math.sin(pt*21+y.lph*9);at=it[0]+d*J,b=it[1]+U*J;let mt=kn(pt*1.2-.55*(z-E.fold)+y.lph)-.5;_t=y.lI*(.2+.2*Math.exp(-mt*mt*60));let B=Yt(.7,1,pt);W[4]=Ft(en[0],Le[0],B),W[5]=Ft(en[1],Le[1],B),W[6]=Ft(en[2],Le[2],B)}else{let pt=(I-za)/(1-za);at=16+(28+Math.sqrt(Math.max(0,2.25-y.lb*y.lb))*.97-16)*pt,b=10+y.lb;let d=kn(pt*1.4-.7*(z-E.fold)+y.lph)-.5;_t=y.lI*(.15+.14*Math.exp(-d*d*60)),W[4]=Le[0],W[5]=Le[1],W[6]=Le[2]}W[0]=Vt[0]+at*s,W[1]=Vt[1]-b*s,W[2]=Vt[2],W[3]=_t,W[7]=.07*s}function At(y,I,z){let $=1.08*Rt.cubicOut(te(0,.62,I))-.02,W=.18+.72*Rt.quadOut(te(0,.45,I)),at=$-W+W*y;z[0]=-1150+2300*at,z[1]=-250+390*at+120*Math.sin(at*Math.PI*1.7),z[2]=760+220*Math.sin(Math.PI*De(at));let b=at>=0&&at<=1?1:0;z[3]=b*3.4*Math.pow(y,1.25)*(1-Rt.quadIn(te(.3,.85,I))),z[4]=.82,z[5]=.9,z[6]=1,z[7]=5}function Gt(y){let I=Rt.expoOut(te(E.agent-.05,E.agent+.42,y)),z=Ft(t?760:1250,t?150:420,I),$=Ft(170,t?140:90,I),W=Ft(650,380,I);if($+=Math.sin(y*3.1)*8,z+=Math.sin(y*2.3)*6,y>E.fail&&y<E.stop){let at=Math.floor(y*24);z+=(Se(at)-.5)*16,$+=(Se(at+77)-.5)*16}return[z,$,W]}let Et=t?[-260,-120,-800]:[-460,-40,-800];function Xt(y,I,z,$){let W=Gt(I),at=Rt.quadOut(te(E.probe,E.fail,I)),b=y*at,_t=Math.sin(b*17+1.3)*60*b+Math.sin(b*29)*40*b*b;$[0]=Ft(W[0],Et[0],b)+_t*.3,$[1]=Ft(W[1],Et[1],b)+_t,$[2]=Ft(W[2],Et[2],b)+Math.sin(b*11)*120*b;let pt=2.2*(.25+.75*y),M=te(E.fail,E.fail+.12,I);if(I>=E.fail){let d=Math.floor(z*24),U=70*(1-te(E.fail+.3,E.stop,I)*.4);$[0]+=(Se(d*131+Math.floor(y*9))-.5)*U,$[1]+=(Se(d*17+Math.floor(y*7)+5)-.5)*U,pt*=Se(d+3)>.25?1:.15,pt*=kn(y*9+Se(d)*3)<Ft(1,.45,te(E.fail+.15,E.stop,I))?1:0,pt*=1-te(E.fail+.35,E.stop-.02,I)}$[3]=I<E.probe?0:pt,$[4]=Ft(.1,pc[0],M),$[5]=Ft(.25,pc[1],M),$[6]=Ft(1,pc[2],M),$[7]=3}let ce=new Float64Array(Math.ceil(27*1e3)+2);{let y=0;for(let I=0;I<ce.length;I++){let z=I/1e3;ce[I]=y;let $=1;z>E.stop-.08&&z<E.drop&&($=Ft(1,.02,Yt(E.stop-.08,E.stop+.02,z))),y+=$/1e3}}let Ht=y=>{let I=De(y,0,26.999)*1e3,z=Math.floor(I);return Ft(ce[z],ce[z+1],I-z)};function $t(y,I){let z=Ht(y),$=Rn(y,E.stop+.2,E.drop,Rt.quadIn)*(y<E.drop?1:0),W=y>E.fail&&y<E.stop?1:0,at=Math.floor(I*24);for(let b=0;b<Ye;b++){let _t=F[b],pt=y<E.drop?0:Rt.backOut(te(E.drop+_t.dF,E.drop+_t.dF+.5,y),.9),M=y<E.pipe-.6?0:Rt.quartInOut(te(E.pipe-.45+_t.dP,E.pipe+.2+_t.dP,y)),d=Rt.quartInOut(te(_t.gT,_t.gT+.5,y)),U=y<E.beam?0:Rt.quartOut(te(E.beam+_t.dB,E.beam+_t.dB+.6,y)),X=y<E.fold?0:Rt.quintInOut(te(E.fold+_t.dL,E.fold+_t.dL+.72,y)),J=y<E.lock?1:Ft(1,.16+.06*Math.sin((y-E.lock)*2.3+_t.lph*2),Rt.quadOut(te(E.lock+.05,E.lock+.6,y))),mt=b*ve*4,B=W&&_t.jit<.35?1:0;for(let Y=0;Y<ve;Y++){let ft=Y/(ve-1);(pt<1||pt>1.0001)&&ot(_t,ft,y,z,k),pt>0&&M<1&&(j(_t,ft,y,z,ct),nt(k,ct,pt)),M>0&&d<1&&(rt(_t,ft,y,z,ct),M>=1&&pt>=1?k.set(ct):nt(k,ct,M)),d>0&&U<1&&(Pt(_t,ft,y,z,ct),d>=1&&M>=1?k.set(ct):nt(k,ct,d)),U>0&&X<1&&(ie(_t,ft,y,z,ct),U>=1?k.set(ct):nt(k,ct,U)),X>0&&(ht(_t,ft,y,z,ct),X>=1?k.set(ct):nt(k,ct,X)),B&&(k[0]+=(Se(at*7+b)-.5)*22,k[1]+=(Se(at*13+b+1)-.5)*22),$>0&&(k[0]*=1-.05*$,k[1]*=1-.05*$);let xt=mt+Y*4;D[xt]=k[0],D[xt+1]=k[1],D[xt+2]=k[2],D[xt+3]=k[3]*J,H[xt]=k[4],H[xt+1]=k[5],H[xt+2]=k[6],H[xt+3]=k[7]}let V=mt+(ve-1)*4;et[b*4]=D[V],et[b*4+1]=D[V+1],et[b*4+2]=D[V+2],et[b*4+3]=y<E.drop?D[V+3]:D[V+3]*(1-De(pt))}for(let b=0;b<ve;b++){let _t=b/(ve-1);At(_t,y,k);let pt=(mc*ve+b)*4;D[pt]=k[0],D[pt+1]=k[1],D[pt+2]=k[2],D[pt+3]=k[3],H[pt]=k[4],H[pt+1]=k[5],H[pt+2]=k[6],H[pt+3]=k[7],Xt(_t,y,I,k),pt=(gc*ve+b)*4,D[pt]=k[0],D[pt+1]=k[1],D[pt+2]=k[2],D[pt+3]=y<E.stop+.1?k[3]:0,H[pt]=k[4],H[pt+1]=k[5],H[pt+2]=k[6],H[pt+3]=k[7]}}function nt(y,I,z){for(let $=0;$<8;$++)y[$]=y[$]+(I[$]-y[$])*z}return{S:F,graph:r,pop:m,M:u,BEAM_LEN:g,ORG:Vt,pos:D,col:H,heads:et,fill:$t,agentPos:Gt,tauOf:Ht,nodeAt:R,gsc:f,gatePos:C,laneY:x,LANES:P,GATES:L,PX0:w,PLEN:A}}var ne={add:(i,t)=>[i[0]+t[0],i[1]+t[1],i[2]+t[2]],sub:(i,t)=>[i[0]-t[0],i[1]-t[1],i[2]-t[2]],mul:(i,t)=>[i[0]*t,i[1]*t,i[2]*t],lerp:(i,t,e)=>[Ft(i[0],t[0],e),Ft(i[1],t[1],e),Ft(i[2],t[2],e)],norm:i=>{let t=Math.hypot(i[0],i[1],i[2])||1;return[i[0]/t,i[1]/t,i[2]/t]},cross:(i,t)=>[i[1]*t[2]-i[2]*t[1],i[2]*t[0]-i[0]*t[2],i[0]*t[1]-i[1]*t[0]]};var In=Math.PI/180;function fh(i,t,e,n,s,r,a=0){let o=ne.norm(ne.sub(t,i)),c=ne.norm(ne.cross(o,[0,1,0])),l=ne.cross(c,o),u=Math.cos(a*In),g=Math.sin(a*In),h=ne.add(ne.mul(c,u),ne.mul(l,g)),m=ne.add(ne.mul(c,-g),ne.mul(l,u)),_=Math.hypot(...ne.sub(t,i)),T=r.H/2/(_*Math.tan(s*In/2)),p=(e-r.W/2)/T,f=(r.H/2-n)/T;return ne.sub(ne.sub(t,ne.mul(h,p)),ne.mul(m,f))}var lm=(i,t,e,n)=>[i[0]+Math.sin(t*In)*Math.cos(e*In)*n,i[1]+Math.sin(e*In)*n,i[2]+Math.cos(t*In)*Math.cos(e*In)*n];function ph(i){let t=Pi[i],e=t.H>t.W,n=Pn.hub,s=Pn.glyphK,r=e?1.28:1,[a,o,c]=t.glyph,l=30*(e?1.25:1),u=c/s,g=t.H/2/(u*Math.tan(l*In/2)),h=a+14*c,m=o+10*c,_=[n[0]+(t.W/2-h)/u,n[1]-(t.H/2-m)/u,n[2]+g],T=l,p=t.heroGlyphW/(28*s),f=t.H/2/(p*Math.tan(T*In/2)),R=[n[0],n[1]+(e?-40:18),n[2]+f],P=Vn(77),S=[];for(let O=E.drop;O<E.fold+.01;O+=.5)S.push({t:O,a:P()*Math.PI*2,s:O%2===0?1:.6});let A=O=>{let Z=0,D=0,H=0;for(let et of S){let k=O-et.t;if(k<0||k>.6)continue;let ct=Math.exp(-k*9)*et.s;Z+=Math.cos(et.a)*ct*Math.sin(k*38),D+=Math.sin(et.a)*ct*Math.sin(k*38),H+=ct}return[Z,D,H]},w=ui([[E.graph,-70],[E.graph+.75,-44,Rt.expoOut],[E.uses,-30,Rt.sineInOut],[E.uses+.8,-22,Rt.cubicInOut],[E.beam,-12,Rt.sineInOut],[E.beam+.6,-8,Rt.cubicInOut],[E.fold,3,Rt.sineInOut]]),L=ui([[E.graph,22],[E.uses,16,Rt.sineInOut],[E.beam,12,Rt.sineInOut],[E.fold,7,Rt.sineInOut]]),x=ui([[E.graph,2050],[E.graph+.75,1720,Rt.expoOut],[E.uses,1640,Rt.sineInOut],[E.uses+.8,1760,Rt.cubicInOut],[E.beam,1860,Rt.sineInOut],[E.beam+.6,2050,Rt.cubicInOut],[E.fold,2300,Rt.sineInOut]]),C=e?ui([[E.graph,540],[E.fold,540]]):ui([[E.graph,960],[E.graph+.9,1240,Rt.expoOut],[E.uses,1230],[E.uses+.8,620,Rt.cubicInOut],[E.beam,610],[E.beam+.8,610,Rt.cubicInOut],[E.fold,590]]),F=e?ui([[E.graph,960],[E.graph+.9,700,Rt.expoOut],[E.uses,700],[E.uses+.8,470,Rt.cubicInOut],[E.beam,470],[E.beam+.8,880,Rt.cubicInOut],[E.fold,880]]):ui([[E.graph,540],[E.graph+.9,398,Rt.expoOut],[E.uses,390],[E.uses+.8,400,Rt.cubicInOut],[E.beam,390],[E.beam+.8,360,Rt.cubicInOut],[E.fold,380]]);function q(O){let Z,D,H,et=0,k=1500,ct=0;if(O<2){let j=Rn(O,0,2,Rt.quadOut);Z=ne.lerp([0,70,1580],[-30,20,1250],j),D=ne.lerp([0,0,-900],[60,-30,-900],j),H=50,et=Ft(0,-2.5,j),k=Ft(2200,1700,j),ct=5}else if(O<3){let j=Rn(O,2,3,Rt.cubicOut);Z=ne.lerp([430,-150,760],[330,-105,590],j),D=ne.lerp([-260,80,-1300],[-200,55,-1300],j),H=44,et=Ft(5,2.5,j),k=1250,ct=7}else if(O<4){let j=Rn(O,3,4,Rt.cubicOut);Z=ne.lerp([-560,250,990],[-460,190,820],j),D=ne.lerp([330,-110,-900],[260,-80,-900],j),H=54,et=Ft(-4.5,-2,j),k=1350,ct=6}else if(O<E.drop){let j=Rn(O,4,E.stop,Rt.quadOut),rt=Rn(O,E.stop+.25,E.drop,Rt.sineInOut);Z=[0,0,Ft(1330,1175,j)+70*rt],D=[0,0,-700],H=48+1.5*rt,et=0,k=Ft(950,820,j),ct=5.5}else if(O>=E.pipe&&O<E.graph){let j=te(E.pipe,E.graph,O),rt=Rt.sineInOut(j),It=e?1.55:1,Pt=[n[0]-Ft(1650,0,Rt.quadIn(j)),n[1],n[2]];Z=[Pt[0]-Ft(650,150,rt)*It,n[1]+Ft(300,120,rt)*It,n[2]+Ft(2900,2e3,rt)*It],H=42,et=Ft(2.5,0,rt);let ie=e?540:Ft(1e3,960,Rt.cubicIn(j)),Vt=e?Ft(700,960,Rt.cubicIn(j)):Ft(405,540,Rt.cubicIn(j));D=fh(Z,Pt,ie,Vt,H*r,t,et),k=Math.hypot(...ne.sub(Pt,Z)),ct=3}else if(O<E.graph){let j=te(E.drop,E.pipe,O),rt=1245-3500*(.62*Rt.expoOut(De(j*1.15))+.38*j*j);Z=[0,0,rt],D=[0,0,rt-3e3],H=Ft(49.5,80,Rt.cubicInOut(j)),et=42*Rt.quartOut(j),k=1800,ct=2.5}else if(O<E.fold){let j=w(O),rt=L(O),It=x(O)*(e?1.8:1);Z=lm(n,j,rt,It),H=42,et=Ft(-3,1.5,te(E.graph,E.fold,O))+(e?-90*Rt.cubicInOut(te(E.beam-.3,E.beam+.6,O)):0),D=fh(Z,n,C(O),F(O),H*r,t,et),k=It,ct=4.5}else{let j=q(E.fold-1e-4),rt=Rn(O,E.fold,E.fold+.95,Rt.quintInOut),It=Rn(O,E.fold+1.45,E.lock,Rt.expoInOut),Pt=ne.add(R,[0,0,-1]);Z=ne.lerp(ne.lerp(j.pos,R,rt),_,It);let ie=ne.norm(ne.sub(j.tgt,j.pos)),Vt=ne.norm(ne.sub(Pt,R)),Jt=ne.norm(ne.lerp(ie,Vt,rt));if(D=ne.add(Z,Jt),H=Ft(Ft(j.fov,T,rt),l,It),et=Ft(j.roll,0,rt),k=Math.hypot(...ne.sub(Z,n)),ct=Ft(j.ap,0,rt),O>E.lock){let it=te(E.lock,E.end,O);Z=ne.add(_,[0,0,-g*.018*Rt.sineInOut(it)]),D=ne.add(Z,[0,0,-1])}return{pos:Z,tgt:D,fov:H,roll:et,focus:k,ap:ct}}let ot=O<E.drop?5:3;if(Z=ne.add(Z,[fc(O*.9,1)*ot,fc(O*.8,2)*ot,0]),O>=E.drop&&O<E.fold){let[j,rt,It]=A(O);Z=ne.add(Z,[j*7,rt*7,0]),H-=It*.9}return{pos:Z,tgt:D,fov:H*r,roll:et,focus:k,ap:ct}}return{at:q,lockPos:_,heroPos:R,Dlock:g,lockFov:l}}var cn=(i,t,e,n=.35)=>i<t?0:e*Math.exp(-(i-t)/n);function mh(i){let t=1;t*=1-.5*Yt(E.stop-.04,E.stop+.12,i)*(i<E.drop?1:0),t+=cn(i,E.drop,1.5,.1)+cn(i,E.pipe,.4,.15)+cn(i,E.graph,.6,.18)+cn(i,E.uses,.35,.2)+cn(i,E.beam,1.1,.25)+cn(i,E.lock,.5,.3);for(let S of[.5,.75,1,1.25,1.5])t+=cn(i,S,.18,.12);let e=.85+.55*Yt(E.drop,E.drop+.4,i)*(1-Yt(E.pipe-.2,E.pipe+.3,i))+.35*Yt(E.beam,E.beam+.3,i)*(1-Yt(E.fold,E.lock,i)),n=.25+.5*Yt(E.beam-.2,E.beam+.4,i)*(1-Yt(E.fold+.2,E.fold+.9,i))-.17*Yt(E.fold+.2,E.fold+.9,i),s=.35+cn(i,E.drop,3.2,.35)+cn(i,E.graph,1,.2)+cn(i,E.beam,1.2,.3),r=0;if(i>E.fail&&i<E.stop+.02){let S=(i-E.fail)/(.5/4);r=(S-Math.floor(S)<.45?1:.15)*(1-.5*te(E.fail,E.stop,i))}let a=null,o=i-E.drop;o>=0&&o<.9&&(a={at:"center",r:Rt.cubicOut(o/.9)*1.3,a:1-o/.9});let c=i-E.uses;c>=0&&c<.8&&(a={at:"hub",r:Rt.cubicOut(c/.8)*1,a:.5*(1-c/.8)});let l=i-E.beam;l>=0&&l<.7&&(a={at:"merge",r:Rt.cubicOut(l/.7)*.9,a:.7*(1-l/.7)});let u=i-E.lock;u>=0&&u<.9&&(a={at:"glyph",r:Rt.cubicOut(u/.9)*1.1,a:.22*(1-u/.9)});let g=cn(i,E.drop,.22,.12)+cn(i,E.lock,.05,.2),h=1-.65*Yt(E.stop-.02,E.stop+.1,i)*(i<E.drop?1:0),m=.55+.3*Yt(E.stop,E.stop+.15,i)*(i<E.drop?1:0)-.15*Yt(E.lock,E.lock+1,i),_=0,T=.022,p=6;i<1.1&&(p=14),i>=E.drop&&i<E.pipe&&(p=10),i>=E.drop&&i<E.drop+.55&&(p=26),i>=E.pipe-.5&&i<E.pipe+.4&&(p=14),i>=E.graph-.6&&i<E.graph&&(p=16),i>=E.graph&&i<E.graph+.5&&(p=12),i>=E.beam&&i<E.beam+.6&&(p=14),i>=E.fold&&i<E.fold+1&&(p=14),i>=E.fold+1.4&&i<E.lock+.1&&(p=12),i>=E.lock+.7&&(p=3);let f=i>=E.drop&&i<E.pipe?(i<E.drop+.4?.3:.75)/30:.5/30,R=i<E.graph?[.5,.5]:i<E.fold?[Ft(.6,.36,Yt(E.uses,E.uses+.8,i)),.6]:[.5,.55],P=i<E.drop?.016:.024;return{exposure:t,bloom:e,streak:n,ca:s,glitch:r,shock:a,flash:g,sat:h,vig:m,fade:_,grain:T,K:p,shutter:f,hazeC:R,haze:P}}var Hn=`
precision highp float;
precision highp int;
precision highp sampler2D;
`,gh=Hn+`
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform sampler2D uPos;   // xyz, intensity
uniform sampler2D uCol;   // rgb, width (world units)
uniform vec2 uRes;
uniform float uWeight;
uniform int uNP;
uniform float uFocus;     // focus distance (view depth)
uniform float uAperture;  // circle of confusion scale, px
in vec3 position;          // (point index, strand index, side)
out vec3 vCol;
out float vAcross;
out float vHalf;
out float vI;
out float vSoft;
void main() {
  int j = int(position.x + 0.5);
  int i = int(position.y + 0.5);
  float side = position.z;
  vec4 P  = texelFetch(uPos, ivec2(j, i), 0);
  vec4 Pp = texelFetch(uPos, ivec2(max(j - 1, 0), i), 0);
  vec4 Pn = texelFetch(uPos, ivec2(min(j + 1, uNP - 1), i), 0);
  vec4 C  = texelFetch(uCol, ivec2(j, i), 0);
  mat4 PV = projectionMatrix * viewMatrix;
  vec4 c  = PV * vec4(P.xyz, 1.0);
  vec4 cp = PV * vec4(Pp.xyz, 1.0);
  vec4 cn = PV * vec4(Pn.xyz, 1.0);
  vec2 hr = 0.5 * uRes;
  vec2 s  = c.xy / max(c.w, 1e-3);
  vec2 sp = cp.xy / max(cp.w, 1e-3);
  vec2 sn = cn.xy / max(cn.w, 1e-3);
  vec2 d = (sn - sp) * hr;
  float dl = length(d);
  vec2 dir = dl > 1e-4 ? d / dl : vec2(1.0, 0.0);
  vec2 nrm = vec2(-dir.y, dir.x);
  float wpx = C.w * projectionMatrix[1][1] * hr.y / max(c.w, 1e-3);
  float minW = 1.15;
  float coc = uAperture * abs(1.0 - uFocus / max(c.w, 1.0));
  float ws = clamp(wpx, minW, 26.0);
  float wt = min(sqrt(ws * ws + coc * coc), 64.0);
  float energy = clamp(wpx / minW, 0.0, 1.0) * (ws / wt);
  float hw = 0.5 * wt + 1.35;
  c.xy += nrm * side * hw / hr * c.w;
  gl_Position = c;
  float nearFade = smoothstep(25.0, 170.0, c.w) * smoothstep(1e-4, 0.02, min(min(cp.w, cn.w), c.w));
  if (c.w < 2.0 || P.w <= 0.0) gl_Position = vec4(3.0, 3.0, 3.0, 1.0);
  vAcross = side * hw;
  vHalf = 0.5 * wt;
  vSoft = clamp(coc / (ws + coc + 1e-3), 0.0, 1.0);
  vI = P.w * energy * nearFade * uWeight;
  vCol = C.rgb;
}`,_h=Hn+`
in vec3 vCol;
in float vAcross;
in float vHalf;
in float vI;
in float vSoft;
out vec4 outColor;
void main() {
  float a = abs(vAcross);
  float edge = clamp(vHalf + 0.6 - a, 0.0, 1.0);
  float glow = exp(-a * a / (2.0 * (vHalf + 0.9) * (vHalf + 0.9)));
  float sig = vHalf * 0.55 + 0.6;
  float soft = exp(-a * a / (2.0 * sig * sig)) * 1.05;
  float k = mix(edge * 0.72 + glow * 0.42, soft, vSoft);
  outColor = vec4(vCol * vI * k, 1.0);
}`,xh=Hn+`
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform vec2 uRes;
uniform float uWeight;
uniform float uFocus;
uniform float uAperture;
in vec3 position;   // quad corner
in vec3 iPos;
in vec4 iCol;       // rgb, intensity
in vec2 iSize;      // world radius, kind (0 spark, 1 node, 2 dust)
out vec2 vUV;
out vec3 vCol;
out float vI;
out float vKind;
out float vExt;
out float vSoft;
void main() {
  vec4 c = projectionMatrix * viewMatrix * vec4(iPos, 1.0);
  vec2 hr = 0.5 * uRes;
  float kind = iSize.y;
  float rpx = iSize.x * projectionMatrix[1][1] * hr.y / max(c.w, 1.0);
  float minR = kind > 1.5 ? 0.8 : 1.1;
  float energy = clamp(rpx / minR, 0.0, 1.0);
  energy *= energy;
  float rs = max(rpx, minR);
  float coc = 0.5 * uAperture * abs(1.0 - uFocus / max(c.w, 1.0));
  float r = min(sqrt(rs * rs + coc * coc), 48.0);
  energy *= (rs * rs) / (r * r);
  float ext = kind > 1.5 ? 2.2 : (kind > 0.5 ? 4.5 : 7.0);
  c.xy += position.xy * r * ext / hr * c.w;
  gl_Position = c;
  if (c.w < 4.0 || iCol.a <= 0.0) gl_Position = vec4(3.0, 3.0, 3.0, 1.0);
  vUV = position.xy * ext;
  vExt = ext;
  vSoft = clamp(coc / (rs + coc + 1e-3), 0.0, 1.0);
  vCol = iCol.rgb;
  vI = iCol.a * energy * uWeight * smoothstep(15.0, 140.0, c.w);
  vKind = kind;
}`,vh=Hn+`
in vec2 vUV;
in vec3 vCol;
in float vI;
in float vKind;
in float vExt;
in float vSoft;
out vec4 outColor;
void main() {
  float d = length(vUV);
  float k;
  if (vKind > 1.5) {
    k = smoothstep(1.2, 0.0, d);
  } else {
    float core = mix(smoothstep(1.0, 0.72, d), exp(-d * d * 1.2), vSoft);
    float glow = exp(-d * d * 0.28) * 0.55 + 0.05 / (0.05 + d * d * 0.06);
    float ring = vKind > 0.5 ? exp(-pow((d - 2.05) * 5.0, 2.0)) * 0.85 * (1.0 - vSoft) : 0.0;
    k = core * 1.3 + glow * 0.5 + ring;
  }
  k *= smoothstep(vExt, vExt * 0.55, d);
  outColor = vec4(vCol * vI * k, 1.0);
}`,yh=Hn+`
in vec3 position;
out vec2 vUv;
void main() {
  vUv = position.xy * 0.5 + 0.5;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}`,Mh=Hn+`
uniform sampler2D tSrc;
uniform vec2 uTexel;
uniform float uFirst;
in vec2 vUv;
out vec4 outColor;
vec3 S(vec2 o) { return texture(tSrc, vUv + o * uTexel).rgb; }
float w(vec3 c) { return 1.0 / (1.0 + dot(c, vec3(0.2126, 0.7152, 0.0722)) * uFirst); }
void main() {
  vec3 a = S(vec2(-2.0, 2.0)), b = S(vec2(0.0, 2.0)), c = S(vec2(2.0, 2.0));
  vec3 d = S(vec2(-2.0, 0.0)), e = S(vec2(0.0, 0.0)), f = S(vec2(2.0, 0.0));
  vec3 g = S(vec2(-2.0, -2.0)), h = S(vec2(0.0, -2.0)), i = S(vec2(2.0, -2.0));
  vec3 j = S(vec2(-1.0, 1.0)), k = S(vec2(1.0, 1.0)), l = S(vec2(-1.0, -1.0)), m = S(vec2(1.0, -1.0));
  vec3 g0 = (a + b + d + e) * 0.25, g1 = (b + c + e + f) * 0.25, g2 = (d + e + g + h) * 0.25, g3 = (e + f + h + i) * 0.25, g4 = (j + k + l + m) * 0.25;
  float w0 = w(g0), w1 = w(g1), w2 = w(g2), w3 = w(g3), w4 = w(g4);
  vec3 o = (g0 * w0 * 0.125 + g1 * w1 * 0.125 + g2 * w2 * 0.125 + g3 * w3 * 0.125 + g4 * w4 * 0.5) /
           (w0 * 0.125 + w1 * 0.125 + w2 * 0.125 + w3 * 0.125 + w4 * 0.5);
  outColor = vec4(o, 1.0);
}`,Sh=Hn+`
uniform sampler2D tLow;
uniform sampler2D tHere;
uniform vec2 uTexel;     // texel of tLow
uniform float uRadius;
uniform float uMix;
in vec2 vUv;
out vec4 outColor;
vec3 L(vec2 o) { return texture(tLow, vUv + o * uTexel * uRadius).rgb; }
void main() {
  vec3 up = (L(vec2(-1.0, 1.0)) + L(vec2(1.0, 1.0)) + L(vec2(-1.0, -1.0)) + L(vec2(1.0, -1.0))) +
            (L(vec2(0.0, 1.0)) + L(vec2(-1.0, 0.0)) + L(vec2(1.0, 0.0)) + L(vec2(0.0, -1.0))) * 2.0 +
            L(vec2(0.0)) * 4.0;
  up /= 16.0;
  outColor = vec4(texture(tHere, vUv).rgb + up * uMix, 1.0);
}`,bh=Hn+`
uniform sampler2D tSrc;
uniform vec2 uTexel;
uniform float uSpread;
in vec2 vUv;
out vec4 outColor;
void main() {
  vec3 acc = vec3(0.0);
  float ws = 0.0;
  for (int k = -7; k <= 7; k++) {
    float x = float(k);
    float w = exp(-x * x / 18.0);
    acc += texture(tSrc, vUv + vec2(x * uSpread * uTexel.x, 0.0)).rgb * w;
    ws += w;
  }
  outColor = vec4(acc / ws, 1.0);
}`,Eh=Hn+`
uniform sampler2D tScene;
uniform sampler2D tBloom;
uniform sampler2D tStreak;
uniform vec2 uRes;
uniform float uExposure;
uniform float uBloom;
uniform float uStreak;
uniform float uCA;
uniform float uGlitch;
uniform float uFrame;
uniform vec4 uShock;     // x, y (uv), radius (in height units), amount
uniform float uFlash;
uniform float uSat;
uniform float uVig;
uniform float uFade;
uniform float uGrain;
uniform vec3 uInk;       // background, display sRGB
uniform vec3 uHaze;      // a faint lift behind the action, display sRGB
uniform vec2 uHazeC;
in vec2 vUv;
out vec4 outColor;

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
const mat3 ACESIn = mat3(0.59719, 0.07600, 0.02840, 0.35458, 0.90834, 0.13383, 0.04823, 0.01566, 0.83777);
const mat3 ACESOut = mat3(1.60475, -0.10208, -0.00327, -0.53108, 1.10813, -0.07276, -0.07367, -0.00605, 1.07602);
vec3 aces(vec3 c) {
  c = ACESIn * c;
  vec3 a = c * (c + 0.0245786) - 0.000090537;
  vec3 b = c * (0.983729 * c + 0.4329510) + 0.238081;
  return clamp(ACESOut * (a / b), 0.0, 1.0);
}
vec3 toSRGB(vec3 c) {
  return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c));
}
vec3 sceneAt(vec2 uv) {
  return texture(tScene, uv).rgb + texture(tBloom, uv).rgb * uBloom + texture(tStreak, uv).rgb * uStreak;
}
void main() {
  vec2 uv = vUv;
  float asp = uRes.x / uRes.y;
  // shockwave: a refracting ring
  vec2 q = (uv - uShock.xy) * vec2(asp, 1.0);
  float r = length(q);
  float ring = exp(-pow((r - uShock.z) / 0.045, 2.0));
  uv -= (r > 1e-4 ? q / r : vec2(0.0)) / vec2(asp, 1.0) * ring * uShock.w * 0.035;
  // glitch: horizontal slices jump, colour splits
  float gRow = floor(uv.y * 23.0);
  float gh = hash(vec2(gRow, uFrame));
  if (uGlitch > 0.0 && gh < uGlitch * 0.4) uv.x += (hash(vec2(gRow + 7.0, uFrame)) - 0.5) * 0.09 * uGlitch;
  // chromatic aberration grows toward the edges
  vec2 dc = uv - 0.5;
  float ca = uCA * 0.006 * (0.25 + dot(dc, dc) * 3.0) + uGlitch * 0.006;
  vec3 col;
  col.r = sceneAt(uv + dc * ca * 1.0).r;
  col.g = sceneAt(uv).g;
  col.b = sceneAt(uv - dc * ca * 1.0).b;
  col = col * uExposure;
  col += ring * uShock.w * 0.025;
  vec3 light = aces(col);
  float l = dot(light, vec3(0.2126, 0.7152, 0.0722));
  light = mix(vec3(l), light, uSat);
  light = toSRGB(light);
  // background: brand ink, a faint haze where the action is
  vec2 hq = (vUv - uHazeC) * vec2(asp, 1.0);
  vec3 bg = uInk + uHaze * exp(-dot(hq, hq) * 1.6);
  vec3 o = 1.0 - (1.0 - bg) * (1.0 - light);
  o += uFlash;
  // vignette
  vec2 vq = (vUv - 0.5) * vec2(asp, 1.0) * 0.9;
  o *= mix(1.0, smoothstep(1.05, 0.2, length(vq)), uVig);
  o = mix(o, uInk, uFade);
  // grain + dither
  float n = hash(vUv * uRes + fract(uFrame * 0.618) * 913.0) + hash(vUv * uRes * 1.37 + uFrame * 1.7) - 1.0;
  o += n * uGrain;
  o += (hash(vUv * uRes + 3.7) - 0.5) / 255.0;
  outColor = vec4(clamp(o, 0.0, 1.0), 1.0);
}`;var xc=1500;function Th(i,t="16x9"){let e=Pi[t],n=e.W,s=e.H;ee.enabled=!1;let r=new Ua({canvas:i,antialias:!1,alpha:!1,preserveDrawingBuffer:!0,powerPreference:"high-performance",premultipliedAlpha:!1});r.setPixelRatio(1),r.setSize(n,s,!1),r.autoClear=!1,r.outputColorSpace=vi;let a=dh({portrait:s>n}),o=ph(t),c=new Oe(50,n/s,10,6e4),l={side:on,blending:Hr,blendEquation:Bn,blendSrc:Ei,blendDst:Ei,blendSrcAlpha:Ei,blendDstAlpha:Ei,transparent:!0,depthTest:!1,depthWrite:!1},u=new Mi(a.pos,ve,Gn,ze,qe),g=new Mi(a.col,ve,Gn,ze,qe);for(let B of[u,g])B.minFilter=B.magFilter=Te,B.generateMipmaps=!1,B.needsUpdate=!0;let h=new Float32Array(Gn*ve*2*3),m=new Uint32Array(Gn*(ve-1)*6);{let B=0,V=0;for(let Y=0;Y<Gn;Y++){for(let ft=0;ft<ve;ft++)for(let xt of[-1,1])h[B++]=ft,h[B++]=Y,h[B++]=xt;for(let ft=0;ft<ve-1;ft++){let xt=(Y*ve+ft)*2;m[V++]=xt,m[V++]=xt+1,m[V++]=xt+2,m[V++]=xt+1,m[V++]=xt+3,m[V++]=xt+2}}}let _=new Xe;_.setAttribute("position",new Pe(h,3)),_.setIndex(new Pe(m,1));let T=new ni({glslVersion:wi,vertexShader:gh,fragmentShader:_h,uniforms:{uPos:{value:u},uCol:{value:g},uRes:{value:new Qt(n,s)},uWeight:{value:1},uNP:{value:ve},uFocus:{value:1500},uAperture:{value:0}},...l}),p=new Be(_,T);p.frustumCulled=!1;let f=Pn.hub,{nodes:R}=a.graph,P={},S=0;P.heads=S,S+=Ye,P.hero=S++,P.agent=S++,P.probe=S++,P.hub=S++,P.nodes=S,S+=R.length,P.merge=S++,P.stations=S,S+=3,P.gates=S,S+=a.LANES*a.GATES.length,P.dust=S,S+=xc;let A=new Float32Array(S*3),w=new Float32Array(S*4),L=new Float32Array(S*2),x=new Cs;x.setAttribute("position",new Pe(new Float32Array([-1,-1,0,1,-1,0,1,1,0,-1,1,0]),3)),x.setIndex([0,1,2,0,2,3]);let C=new Si(A,3),F=new Si(w,4),q=new Si(L,2);for(let B of[C,F,q])B.setUsage(Vo);x.setAttribute("iPos",C),x.setAttribute("iCol",F),x.setAttribute("iSize",q),x.instanceCount=S;let O=new ni({glslVersion:wi,vertexShader:xh,fragmentShader:vh,uniforms:{uRes:{value:new Qt(n,s)},uWeight:{value:1},uFocus:{value:1500},uAperture:{value:0}},...l}),Z=new Be(x,O);Z.frustumCulled=!1;let D=new Ji;D.add(p,Z);let H=Vn(99),et=[];for(let B=0;B<xc;B++)et.push({p:[(H()*2-1)*3800,(H()*2-1)*2400,-7600+H()*10400],ph:H()*Cn,f:.6+H()*1.8,b:.3+H()*.7,s:1.6+H()*2.4});let k=(B,V,Y,ft,xt,lt)=>{A[B*3]=V[0],A[B*3+1]=V[1],A[B*3+2]=V[2],w[B*4]=Y[0],w[B*4+1]=Y[1],w[B*4+2]=Y[2],w[B*4+3]=ft,L[B*2]=xt,L[B*2+1]=lt},ct=[.3,.45,1],ot=[0,0,0],j=[.85,.9,1],rt=[E.beam+.5,E.beam+.75,E.beam+1],It=s>n?[150,420,690]:[300,690,1080];function Pt(B,V){let Y=a.heads;for(let lt=0;lt<Ye;lt++){let dt=a.S[lt].c;k(P.heads+lt,[Y[lt*4],Y[lt*4+1],Y[lt*4+2]],dt,Y[lt*4+3]*.85,4.2,0)}{let lt=(mc*ve+ve-1)*4;k(P.hero,[a.pos[lt],a.pos[lt+1],a.pos[lt+2]],[.85,.9,1],a.pos[lt+3]*1.1,11,0)}{let lt=Yt(E.agent-.02,E.agent+.12,B)*(1-Yt(E.drop-.25,E.drop+.05,B)),dt=B>E.fail&&B<E.stop?1:0,vt=Math.floor(V*24),St=dt?(vt*2654435761>>>0)%5<3?1:.35:1,kt=dt?[1,.35,.16]:[.25,.4,1];k(P.agent,a.agentPos(B),kt,lt*3.2*St*(B>E.stop?.55:1),10,0);let N=(gc*ve+ve-1)*4;k(P.probe,[a.pos[N],a.pos[N+1],a.pos[N+2]],dt?[1,.4,.2]:[.4,.55,1],a.pos[N+3]*.9,6,0)}{let lt=Yt(E.drop+.1,E.drop+.7,B)*(1-Yt(E.graph-.1,E.graph+.25,B));k(P.hub,f,[.5,.62,1],lt*3,38,0)}let ft=a.pop;for(let lt=0;lt<R.length;lt++){let dt=R[lt],vt=Rt.backOut(te(ft[lt],ft[lt]+.38,B),2.6)*(1-Rt.cubicIn(te(E.fold+.05,E.fold+.6,B))),St=[30,15,6.5][dt.kind]*Math.max(0,vt),kt=1-.35*Yt(E.beam,E.beam+.5,B),N=Math.exp(-Math.max(0,B-ft[lt])*6)*(B>=ft[lt]?1.5:0);if(dt.kind===1){for(let Mt of Ws)Mt.domains.includes(dt.cluster)&&B>=Mt.t-.12&&(N+=Math.exp(-(B-Mt.t+.12)*4)*2.2);B>=E.uses&&(N+=Math.exp(-(B-E.uses-dt.cluster*.06)*5)*(B>=E.uses+dt.cluster*.06?1.8:0))}k(P.nodes+lt,a.nodeAt(lt,B,ot),dt.kind===0?[.3,.46,1]:j,([2.2,1.35,1.6][dt.kind]+N)*kt*(vt>.001?1:0),St,dt.kind===2?0:1)}{let lt=1-Yt(E.graph-.55,E.graph-.25,B);for(let dt=0;dt<a.GATES.length;dt++)for(let vt=0;vt<a.LANES;vt++){let St=E.pipe-.1+dt*.08+vt*.02,kt=Rt.backOut(te(St,St+.35,B),2.2)*lt,N=B>=St?Math.exp(-(B-St)*5)*1.5:0;k(P.gates+dt*a.LANES+vt,a.gatePos(dt,vt),[.45,.6,1],(1.1+N)*(kt>.001?1:0),10*Math.max(0,kt),1)}}{let lt=Yt(E.beam-.02,E.beam+.08,B)*(1-Yt(E.fold+.2,E.fold+.8,B));k(P.merge,a.M,[.45,.6,1],lt*(2.6+3*Math.exp(-Math.max(0,B-E.beam)*5)),17,0);for(let dt=0;dt<3;dt++){let vt=Rt.backOut(te(rt[dt]-.05,rt[dt]+.3,B),2.4)*(1-Rt.cubicIn(te(E.fold,E.fold+.45,B))),St=B>=rt[dt]?Math.exp(-(B-rt[dt])*7)*2:0;k(P.stations+dt,[a.M[0]+It[dt],a.M[1],a.M[2]],ct,(1.6+St)*(vt>.001?1:0),12*Math.max(0,vt),1)}}let xt=.9*(1-.55*Yt(E.lock,E.lock+1,B))*(.45+.55*Yt(.05,.6,B));for(let lt=0;lt<xc;lt++){let dt=et[lt],vt=.55+.45*Math.sin(B*dt.f+dt.ph);k(P.dust+lt,dt.p,[.62,.7,.95],.2*dt.b*vt*xt,dt.s,2)}C.needsUpdate=F.needsUpdate=q.needsUpdate=!0}function ie(B){let V=o.at(B);c.position.set(V.pos[0],V.pos[1],V.pos[2]),c.up.set(0,1,0),c.lookAt(V.tgt[0],V.tgt[1],V.tgt[2]),c.rotateZ(V.roll*Math.PI/180),c.fov=V.fov,c.updateProjectionMatrix(),c.updateMatrixWorld(!0),T.uniforms.uFocus.value=O.uniforms.uFocus.value=V.focus,T.uniforms.uAperture.value=O.uniforms.uAperture.value=V.ap}let Vt={type:tn,format:ze,depthBuffer:!1,stencilBuffer:!1,minFilter:we,magFilter:we,generateMipmaps:!1},Jt=new Ae(n,s,Vt),it=6,ht=[],At=[];for(let B=0;B<it;B++){let V=Math.max(1,Math.round(n/2**(B+1))),Y=Math.max(1,Math.round(s/2**(B+1)));ht.push(new Ae(V,Y,Vt)),At.push(new Ae(V,Y,Vt))}let Gt=new Ae(ht[1].width,ht[1].height,Vt),Et=new Ae(ht[1].width,ht[1].height,Vt),Xt=new Xe;Xt.setAttribute("position",new Pe(new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),3));let ce=(B,V)=>new ni({glslVersion:wi,vertexShader:yh,fragmentShader:B,uniforms:V,depthTest:!1,depthWrite:!1}),Ht=ce(Mh,{tSrc:{value:null},uTexel:{value:new Qt},uFirst:{value:1}}),$t=ce(Sh,{tLow:{value:null},tHere:{value:null},uTexel:{value:new Qt},uRadius:{value:1},uMix:{value:1}}),nt=ce(bh,{tSrc:{value:null},uTexel:{value:new Qt},uSpread:{value:1}}),y=ce(Eh,{tScene:{value:Jt.texture},tBloom:{value:At[0].texture},tStreak:{value:Et.texture},uRes:{value:new Qt(n,s)},uExposure:{value:1},uBloom:{value:1},uStreak:{value:.3},uCA:{value:0},uGlitch:{value:0},uFrame:{value:0},uShock:{value:new xe(.5,.5,0,0)},uFlash:{value:0},uSat:{value:1},uVig:{value:.5},uFade:{value:0},uGrain:{value:.02},uInk:{value:new tt(16/255,16/255,19/255)},uHaze:{value:new tt(.02,.025,.05)},uHazeC:{value:new Qt(.5,.5)}}),I=new Be(Xt,Ht);I.frustumCulled=!1;let z=new Ji;z.add(I);let $=new bi(-1,1,1,-1,0,1),W=(B,V)=>{I.material=B,r.setRenderTarget(V),r.render(z,$)};function at(B,V,Y){let ft=Jt;for(let St=0;St<it;St++)Ht.uniforms.tSrc.value=ft.texture,Ht.uniforms.uTexel.value.set(1/ft.width,1/ft.height),Ht.uniforms.uFirst.value=St===0?1:0,W(Ht,ht[St]),ft=ht[St];let xt=ht[it-1];for(let St=it-2;St>=0;St--)$t.uniforms.tLow.value=xt.texture,$t.uniforms.tHere.value=ht[St].texture,$t.uniforms.uTexel.value.set(1/xt.width,1/xt.height),$t.uniforms.uRadius.value=1,$t.uniforms.uMix.value=.85,W($t,At[St]),xt=At[St];let lt=ht[1];[1.5,4.5,13.5].forEach((St,kt)=>{nt.uniforms.tSrc.value=lt.texture,nt.uniforms.uTexel.value.set(1/lt.width,1/lt.height),nt.uniforms.uSpread.value=St;let N=kt%2===0?Gt:Et;W(nt,N),lt=N}),y.uniforms.tStreak.value=lt.texture;let vt=y.uniforms;if(vt.uExposure.value=Y.exposure,vt.uBloom.value=Y.bloom*.26,vt.uStreak.value=Y.streak*.22,vt.uCA.value=Y.ca,vt.uGlitch.value=Y.glitch,vt.uFrame.value=V,vt.uFlash.value=Y.flash,vt.uSat.value=Y.sat,vt.uVig.value=Y.vig,vt.uFade.value=Y.fade,vt.uGrain.value=Y.grain,vt.uHaze.value.set(.35*Y.haze,.5*Y.haze,Y.haze*1.6),vt.uHazeC.value.set(Y.hazeC[0],1-Y.hazeC[1]),Y.shock){let St=[.5,.5];if(Y.shock.at==="merge"&&(St=pt(a.M)),Y.shock.at==="hub"&&(St=pt(f)),Y.shock.at==="glyph"){let[kt,N,Mt]=e.glyph;St=[(kt+14*Mt)/n,1-(N+10*Mt)/s]}vt.uShock.value.set(St[0],St[1],Y.shock.r,Y.shock.a)}else vt.uShock.value.set(.5,.5,0,0);W(y,null)}let b=new tt,_t=(B,V)=>[B[0]+V[0],B[1]+V[1],B[2]+V[2]];function pt(B){return b.set(B[0],B[1],B[2]).project(c),[(b.x+1)/2,(b.y+1)/2]}function M(B){b.set(B[0],B[1],B[2]),b.applyMatrix4(c.matrixWorldInverse);let V=-b.z;b.applyMatrix4(c.projectionMatrix);let Y=s/2*c.projectionMatrix.elements[5]/Math.max(V,1);return{x:(b.x+1)/2*n,y:(1-b.y)/2*s,depth:V,ppu:Y,on:V>1}}let d=[];a.S.forEach((B,V)=>{d.length<14&&B.birth<=1.3&&Math.abs(B.C[0])<1150&&Math.abs(B.C[1])<620&&B.C[2]>-1500&&B.C[2]<200&&d.push(V)});let U=B=>{let V=0;for(let Y of Ic)Y<=B+1e-6&&(V=Y);return V};function X(B){let V=mh(B),Y=Math.round(B*30),ft=V.K,xt=U(B);T.uniforms.uWeight.value=1/ft,O.uniforms.uWeight.value=1/ft,r.setRenderTarget(Jt),r.setClearColor(0,1),r.clear(!0,!1,!1);for(let yt=0;yt<ft;yt++){let bt=B-V.shutter*(ft-1-yt)/Math.max(1,ft-1);bt<xt&&(bt=xt),bt<0&&(bt=0),a.fill(bt,B),u.needsUpdate=!0,g.needsUpdate=!0,Pt(bt,B),ie(bt),r.setRenderTarget(Jt),r.render(D,c)}at(B,Y,V);let lt=a.heads,dt=d.map(yt=>({...M([lt[yt*4],lt[yt*4+1],lt[yt*4+2]]),I:lt[yt*4+3]})),vt=a.graph.centres.map(yt=>M(a.nodeAt(yt,B,[0,0,0]))),St=It.map(yt=>M([a.M[0]+yt,a.M[1],a.M[2]])),kt=B>=E.drop-.1&&B<E.pipe+.1?mt(B):null,N=B>=E.pipe-.1&&B<E.graph+.05,Mt=N?a.GATES.map((yt,bt)=>M(_t(a.gatePos(bt,0),[0,80,0]))):null,ut=N?Array.from({length:a.LANES},(yt,bt)=>M([a.PX0+a.PLEN*.68,a.laneY(bt)+30,Pn.hub[2]])):null;return{tags:dt,ftags:kt,labels:vt,stations:St,gates:Mt,lanes:ut,agent:M(a.agentPos(B)),merge:M(a.M),hub:M(f)}}let J=[];{let B=Vn(5150);for(let V=0;V<16;V++)J.push({a:V/16*Cn+B()*.3,R:520+B()*900,z:-700-V*190-B()*120})}function mt(B){return J.map(V=>{let Y=te(1800,f[2],V.z),ft=Math.pow(Yt(.3,1,Y),1.15),xt=V.R*(1-ft*.8),lt=[f[0]+xt*Math.cos(V.a),f[1]+xt*Math.sin(V.a),V.z+260*(B-E.drop)];return M(lt)})}return{render:X,funnelTags:mt,W:n,H:s,info:()=>({gl:r.getContext().getParameter(r.getContext().VERSION),r:r.getContext().getParameter(r.getContext().RENDERER),nB:S})}}var ka={airtable:{title:"Airtable",d:"M11.992 1.966c-.434 0-.87.086-1.28.257L1.779 5.917c-.503.208-.49.908.012 1.116l8.982 3.558a3.266 3.266 0 0 0 2.454 0l8.982-3.558c.503-.196.503-.908.012-1.116l-8.957-3.694a3.255 3.255 0 0 0-1.272-.257zM23.4 8.056a.589.589 0 0 0-.222.045l-10.012 3.877a.612.612 0 0 0-.38.564v8.896a.6.6 0 0 0 .821.552L23.62 18.1a.583.583 0 0 0 .38-.551V8.653a.6.6 0 0 0-.6-.596zM.676 8.095a.644.644 0 0 0-.48.19C.086 8.396 0 8.53 0 8.69v8.355c0 .442.515.737.908.54l6.27-3.006.307-.147 2.969-1.436c.466-.22.43-.908-.061-1.092L.883 8.138a.57.57 0 0 0-.207-.044z"},apachekafka:{title:"Apache Kafka",d:"M9.71 2.136a1.43 1.43 0 0 0-2.047 0h-.007a1.48 1.48 0 0 0-.421 1.042c0 .41.161.777.422 1.039l.007.007c.257.264.616.426 1.019.426.404 0 .766-.162 1.027-.426l.003-.007c.261-.262.421-.629.421-1.039 0-.408-.159-.777-.421-1.042H9.71zM8.683 22.295c.404 0 .766-.167 1.027-.429l.003-.008c.261-.261.421-.631.421-1.036 0-.41-.159-.778-.421-1.044H9.71a1.42 1.42 0 0 0-1.027-.432 1.4 1.4 0 0 0-1.02.432h-.007c-.26.266-.422.634-.422 1.044 0 .406.161.775.422 1.036l.007.008c.258.262.617.429 1.02.429zm7.89-4.462c.359-.096.683-.33.882-.684l.027-.052a1.47 1.47 0 0 0 .114-1.067 1.454 1.454 0 0 0-.675-.896l-.021-.014a1.425 1.425 0 0 0-1.078-.132c-.36.091-.684.335-.881.686-.2.349-.241.75-.146 1.119.099.363.33.691.675.896h.002c.346.203.737.239 1.101.144zm-6.405-7.342a2.083 2.083 0 0 0-1.485-.627c-.58 0-1.103.242-1.482.627-.378.385-.612.916-.612 1.507s.233 1.124.612 1.514a2.08 2.08 0 0 0 2.967 0c.379-.39.612-.923.612-1.514s-.233-1.122-.612-1.507zm-.835-2.51c.843.141 1.6.552 2.178 1.144h.004c.092.093.182.196.265.299l1.446-.851a3.176 3.176 0 0 1-.047-1.808 3.149 3.149 0 0 1 1.456-1.926l.025-.016a3.062 3.062 0 0 1 2.345-.306c.77.21 1.465.721 1.898 1.482v.002c.431.757.518 1.626.313 2.408a3.145 3.145 0 0 1-1.456 1.928l-.198.118h-.02a3.095 3.095 0 0 1-2.154.201 3.127 3.127 0 0 1-1.514-.944l-1.444.848a4.162 4.162 0 0 1 0 2.879l1.444.846c.413-.47.939-.789 1.514-.944a3.041 3.041 0 0 1 2.371.319l.048.023v.002a3.17 3.17 0 0 1 1.408 1.906 3.215 3.215 0 0 1-.313 2.405l-.026.053-.003-.005a3.147 3.147 0 0 1-1.867 1.436 3.096 3.096 0 0 1-2.371-.318v-.006a3.156 3.156 0 0 1-1.456-1.927 3.175 3.175 0 0 1 .047-1.805l-1.446-.848a3.905 3.905 0 0 1-.265.294l-.004.005a3.938 3.938 0 0 1-2.178 1.138v1.699a3.09 3.09 0 0 1 1.56.862l.002.004c.565.572.914 1.368.914 2.243 0 .873-.35 1.664-.914 2.239l-.002.009a3.1 3.1 0 0 1-2.21.931 3.1 3.1 0 0 1-2.206-.93h-.002v-.009a3.186 3.186 0 0 1-.916-2.239c0-.875.35-1.672.916-2.243v-.004h.002a3.1 3.1 0 0 1 1.558-.862v-1.699a3.926 3.926 0 0 1-2.176-1.138l-.006-.005a4.098 4.098 0 0 1-1.173-2.874c0-1.122.452-2.136 1.173-2.872h.006a3.947 3.947 0 0 1 2.176-1.144V6.289a3.137 3.137 0 0 1-1.558-.864h-.002v-.004a3.192 3.192 0 0 1-.916-2.243c0-.871.35-1.669.916-2.243l.002-.002A3.084 3.084 0 0 1 8.683 0c.861 0 1.641.355 2.21.932v.002h.002c.565.574.914 1.372.914 2.243 0 .876-.35 1.667-.914 2.243l-.002.005a3.142 3.142 0 0 1-1.56.864v1.692zm8.121-1.129l-.012-.019a1.452 1.452 0 0 0-.87-.668 1.43 1.43 0 0 0-1.103.146h.002c-.347.2-.58.529-.677.896-.095.365-.054.768.146 1.119l.007.009c.2.347.519.579.874.673.357.103.755.059 1.098-.144l.019-.009a1.47 1.47 0 0 0 .657-.885 1.493 1.493 0 0 0-.141-1.118"},clickhouse:{title:"ClickHouse",d:"M21.333 10H24v4h-2.667ZM16 1.335h2.667v21.33H16Zm-5.333 0h2.666v21.33h-2.666ZM0 22.665V1.335h2.667v21.33zm5.333-21.33H8v21.33H5.333Z"},confluence:{title:"Confluence",d:"M.87 18.257c-.248.382-.53.875-.763 1.245a.764.764 0 0 0 .255 1.04l4.965 3.054a.764.764 0 0 0 1.058-.26c.199-.332.454-.763.733-1.221 1.967-3.247 3.945-2.853 7.508-1.146l4.957 2.337a.764.764 0 0 0 1.028-.382l2.364-5.346a.764.764 0 0 0-.382-1 599.851 599.851 0 0 1-4.965-2.361C10.911 10.97 5.224 11.185.87 18.257zM23.131 5.743c.249-.405.531-.875.764-1.25a.764.764 0 0 0-.256-1.034L18.675.404a.764.764 0 0 0-1.058.26c-.195.335-.451.763-.734 1.225-1.966 3.246-3.945 2.85-7.508 1.146L4.437.694a.764.764 0 0 0-1.027.382L1.046 6.422a.764.764 0 0 0 .382 1c1.039.49 3.105 1.467 4.965 2.361 6.698 3.246 12.392 3.029 16.738-4.04z"},databricks:{title:"Databricks",d:"M.95 14.184L12 20.403l9.919-5.55v2.21L12 22.662l-10.484-5.96-.565.308v.77L12 24l11.05-6.218v-4.317l-.515-.309L12 19.118l-9.867-5.653v-2.21L12 16.805l11.05-6.218V6.32l-.515-.308L12 11.974 2.647 6.681 12 1.388l7.76 4.368.668-.411v-.566L12 0 .95 6.27v.72L12 13.207l9.919-5.55v2.26L12 15.52 1.516 9.56l-.565.308Z"},dropbox:{title:"Dropbox",d:"M6 1.807L0 5.629l6 3.822 6.001-3.822L6 1.807zM18 1.807l-6 3.822 6 3.822 6-3.822-6-3.822zM0 13.274l6 3.822 6.001-3.822L6 9.452l-6 3.822zM18 9.452l-6 3.822 6 3.822 6-3.822-6-3.822zM6 18.371l6.001 3.822 6-3.822-6-3.822L6 18.371z"},elastic:{title:"Elastic",d:"M20.345 16.33l-3.959-.926-1.05-2.01 5.177-4.535a3.962 3.962 0 012.559 3.702 4.006 4.006 0 01-2.727 3.77m-2.976 4.68c-.616 0-1.22-.207-1.714-.587l.782-4.077 3.596.841c.115.31.172.642.172.987a2.839 2.839 0 01-2.836 2.836m-2.637-.586a5.92 5.92 0 01-4.908 2.6A5.947 5.947 0 014 15.905l5.167-4.67 5.272 2.403 1.167 2.23zM.928 11.443a4.007 4.007 0 012.726-3.77l3.95.933.927 1.98-5.05 4.565a3.97 3.97 0 01-2.553-3.708m5.703-8.45a2.841 2.841 0 011.723.58l-.789 4.092-3.598-.85a2.842 2.842 0 01-.172-.986A2.84 2.84 0 016.63 2.992m2.66.59A5.92 5.92 0 0120.1 6.93c0 .4-.038.781-.114 1.164l-5.299 4.643-5.251-2.394-1.026-2.19zM24 12.571a4.723 4.723 0 00-3.124-4.454 6.695 6.695 0 00.126-1.29A6.789 6.789 0 0014.22.047 6.769 6.769 0 008.727 2.86a3.586 3.586 0 00-2.204-.754A3.604 3.604 0 003.15 6.959 4.786 4.786 0 000 11.431 4.727 4.727 0 003.139 15.9a6.876 6.876 0 00-.124 1.289 6.773 6.773 0 006.765 6.765c2.19 0 4.22-1.052 5.49-2.824a3.568 3.568 0 002.207.769 3.603 3.603 0 003.374-4.854A4.785 4.785 0 0024 12.572"},googlebigquery:{title:"Google BigQuery",d:"M5.676 10.595h2.052v5.244a5.892 5.892 0 0 1-2.052-2.088v-3.156zm18.179 10.836a.504.504 0 0 1 0 .708l-1.716 1.716a.504.504 0 0 1-.708 0l-4.248-4.248a.206.206 0 0 1-.007-.007c-.02-.02-.028-.045-.043-.066a10.736 10.736 0 0 1-6.334 2.065C4.835 21.599 0 16.764 0 10.799S4.835 0 10.8 0s10.799 4.835 10.799 10.8c0 2.369-.772 4.553-2.066 6.333.025.017.052.028.074.05l4.248 4.248zm-5.028-10.632a8.015 8.015 0 1 0-8.028 8.028h.024a8.016 8.016 0 0 0 8.004-8.028zm-4.86 4.98a6.002 6.002 0 0 0 2.04-2.184v-1.764h-2.04v3.948zm-4.5.948c.442.057.887.08 1.332.072.4.025.8.025 1.2 0V7.692H9.468v9.035z"},googlecloud:{title:"Google Cloud",d:"M12.19 2.38a9.344 9.344 0 0 0-9.234 6.893c.053-.02-.055.013 0 0-3.875 2.551-3.922 8.11-.247 10.941l.006-.007-.007.03a6.717 6.717 0 0 0 4.077 1.356h5.173l.03.03h5.192c6.687.053 9.376-8.605 3.835-12.35a9.365 9.365 0 0 0-2.821-4.552l-.043.043.006-.05A9.344 9.344 0 0 0 12.19 2.38zm-.358 4.146c1.244-.04 2.518.368 3.486 1.15a5.186 5.186 0 0 1 1.862 4.078v.518c3.53-.07 3.53 5.262 0 5.193h-5.193l-.008.009v-.04H6.785a2.59 2.59 0 0 1-1.067-.23h.001a2.597 2.597 0 1 1 3.437-3.437l3.013-3.012A6.747 6.747 0 0 0 8.11 8.24c.018-.01.04-.026.054-.023a5.186 5.186 0 0 1 3.67-1.69z"},googledrive:{title:"Google Drive",d:"M12.01 1.485c-2.082 0-3.754.02-3.743.047.01.02 1.708 3.001 3.774 6.62l3.76 6.574h3.76c2.081 0 3.753-.02 3.742-.047-.005-.02-1.708-3.001-3.775-6.62l-3.76-6.574zm-4.76 1.73a789.828 789.861 0 0 0-3.63 6.319L0 15.868l1.89 3.298 1.885 3.297 3.62-6.335 3.618-6.33-1.88-3.287C8.1 4.704 7.255 3.22 7.25 3.214zm2.259 12.653-.203.348c-.114.198-.96 1.672-1.88 3.287a423.93 423.948 0 0 1-1.698 2.97c-.01.026 3.24.042 7.222.042h7.244l1.796-3.157c.992-1.734 1.85-3.23 1.906-3.323l.104-.167h-7.249z"},hubspot:{title:"HubSpot",d:"M18.164 7.93V5.084a2.198 2.198 0 001.267-1.978v-.067A2.2 2.2 0 0017.238.845h-.067a2.2 2.2 0 00-2.193 2.193v.067a2.196 2.196 0 001.252 1.973l.013.006v2.852a6.22 6.22 0 00-2.969 1.31l.012-.01-7.828-6.095A2.497 2.497 0 104.3 4.656l-.012.006 7.697 5.991a6.176 6.176 0 00-1.038 3.446c0 1.343.425 2.588 1.147 3.607l-.013-.02-2.342 2.343a1.968 1.968 0 00-.58-.095h-.002a2.033 2.033 0 102.033 2.033 1.978 1.978 0 00-.1-.595l.005.014 2.317-2.317a6.247 6.247 0 104.782-11.134l-.036-.005zm-.964 9.378a3.206 3.206 0 113.215-3.207v.002a3.206 3.206 0 01-3.207 3.207z"},jira:{title:"Jira",d:"M11.571 11.513H0a5.218 5.218 0 0 0 5.232 5.215h2.13v2.057A5.215 5.215 0 0 0 12.575 24V12.518a1.005 1.005 0 0 0-1.005-1.005zm5.723-5.756H5.736a5.215 5.215 0 0 0 5.215 5.214h2.129v2.058a5.218 5.218 0 0 0 5.215 5.214V6.758a1.001 1.001 0 0 0-1.001-1.001zM23.013 0H11.455a5.215 5.215 0 0 0 5.215 5.215h2.129v2.057A5.215 5.215 0 0 0 24 12.483V1.005A1.001 1.001 0 0 0 23.013 0Z"},mongodb:{title:"MongoDB",d:"M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"},mysql:{title:"MySQL",d:"M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153zM5.77 18.695h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 00-.195 4.41H0c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.347-4.064h1.095c.242 2.015.384 3.86.428 5.53zm4.017-4.08c-.378 2.045-.876 3.533-1.492 4.46-.482.716-1.01 1.073-1.583 1.073-.153 0-.34-.046-.566-.138v-.494c.11.017.24.026.386.026.268 0 .483-.075.647-.222.197-.18.295-.382.295-.605 0-.155-.077-.47-.23-.944L6.23 14.615h.91l.727 2.36c.164.536.233.91.205 1.123.4-1.064.678-2.227.835-3.483zm12.325 4.08h-2.63v-5.53h.885v4.85h1.745zm-3.32.135l-1.016-.5c.09-.076.177-.158.255-.25.433-.506.648-1.258.648-2.253 0-1.83-.718-2.746-2.155-2.746-.704 0-1.254.232-1.65.697-.43.508-.646 1.256-.646 2.245 0 .972.19 1.686.574 2.14.35.41.877.615 1.583.615.264 0 .506-.033.725-.098l1.325.772.36-.622zM15.5 17.588c-.225-.36-.337-.94-.337-1.736 0-1.393.424-2.09 1.27-2.09.443 0 .77.167.977.5.224.362.336.936.336 1.723 0 1.404-.424 2.108-1.27 2.108-.445 0-.77-.167-.978-.5zm-1.658-.425c0 .47-.172.856-.516 1.156-.344.3-.803.45-1.384.45-.543 0-1.064-.172-1.573-.515l.237-.476c.438.22.833.328 1.19.328.332 0 .593-.073.783-.22a.754.754 0 00.3-.615c0-.33-.23-.61-.648-.845-.388-.213-1.163-.657-1.163-.657-.422-.307-.632-.636-.632-1.177 0-.45.157-.81.47-1.085.315-.278.72-.415 1.22-.415.512 0 .98.136 1.4.41l-.213.476a2.726 2.726 0 00-1.064-.23c-.283 0-.502.068-.654.206a.685.685 0 00-.248.524c0 .328.234.61.666.85.393.215 1.187.67 1.187.67.433.305.648.63.648 1.168zm9.382-5.852c-.535-.014-.95.04-1.297.188-.1.04-.26.04-.274.167.055.053.063.14.11.214.08.134.218.313.346.407.14.11.28.216.427.31.26.16.555.255.81.416.145.094.293.213.44.313.073.05.12.14.214.172v-.02c-.046-.06-.06-.147-.105-.214-.067-.067-.134-.127-.2-.193a3.223 3.223 0 00-.695-.675c-.214-.146-.682-.35-.77-.595l-.013-.014c.146-.013.32-.066.46-.106.227-.06.435-.047.67-.106.106-.027.213-.06.32-.094v-.06c-.12-.12-.21-.283-.334-.395a8.867 8.867 0 00-1.104-.823c-.21-.134-.476-.22-.697-.334-.08-.04-.214-.06-.26-.127-.12-.146-.19-.34-.275-.514a17.69 17.69 0 01-.547-1.163c-.12-.262-.193-.523-.34-.763-.69-1.137-1.437-1.826-2.586-2.5-.247-.14-.543-.2-.856-.274-.167-.008-.334-.02-.5-.027-.11-.047-.216-.174-.31-.235-.38-.24-1.364-.76-1.644-.072-.18.434.267.862.422 1.082.115.153.26.328.34.5.047.116.06.235.107.356.106.294.207.622.347.897.073.14.153.287.247.413.054.073.146.107.167.227-.094.136-.1.334-.154.5-.24.757-.146 1.693.194 2.25.107.166.362.534.703.393.3-.12.234-.5.32-.835.02-.08.007-.133.048-.187v.015c.094.188.188.367.274.555.206.328.566.668.867.895.16.12.287.328.487.402v-.02h-.015c-.043-.058-.1-.086-.154-.133a3.445 3.445 0 01-.35-.4 8.76 8.76 0 01-.747-1.218c-.11-.21-.202-.436-.29-.643-.04-.08-.04-.2-.107-.24-.1.146-.247.273-.32.453-.127.288-.14.642-.188 1.01-.027.007-.014 0-.027.014-.214-.052-.287-.274-.367-.46-.2-.475-.233-1.238-.06-1.785.047-.14.247-.582.167-.716-.042-.127-.174-.2-.247-.303a2.478 2.478 0 01-.24-.427c-.16-.374-.24-.788-.414-1.162-.08-.173-.22-.354-.334-.513-.127-.18-.267-.307-.368-.52-.033-.073-.08-.194-.027-.274.014-.054.042-.075.094-.09.088-.072.335.022.422.062.247.1.455.194.662.334.094.066.195.193.315.226h.14c.214.047.455.014.655.073.355.114.675.28.962.46a5.953 5.953 0 012.085 2.286c.08.154.115.295.188.455.14.33.313.663.455.982.14.315.275.636.476.897.1.14.502.213.682.286.133.06.34.115.46.188.23.14.454.3.67.454.11.076.443.243.463.378z"},notion:{title:"Notion",d:"M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"},postgresql:{title:"PostgreSQL",d:"M23.5594 14.7228a.5269.5269 0 0 0-.0563-.1191c-.139-.2632-.4768-.3418-1.0074-.2321-1.6533.3411-2.2935.1312-2.5256-.0191 1.342-2.0482 2.445-4.522 3.0411-6.8297.2714-1.0507.7982-3.5237.1222-4.7316a1.5641 1.5641 0 0 0-.1509-.235C21.6931.9086 19.8007.0248 17.5099.0005c-1.4947-.0158-2.7705.3461-3.1161.4794a9.449 9.449 0 0 0-.5159-.0816 8.044 8.044 0 0 0-1.3114-.1278c-1.1822-.0184-2.2038.2642-3.0498.8406-.8573-.3211-4.7888-1.645-7.2219.0788C.9359 2.1526.3086 3.8733.4302 6.3043c.0409.818.5069 3.334 1.2423 5.7436.4598 1.5065.9387 2.7019 1.4334 3.582.553.9942 1.1259 1.5933 1.7143 1.7895.4474.1491 1.1327.1441 1.8581-.7279.8012-.9635 1.5903-1.8258 1.9446-2.2069.4351.2355.9064.3625 1.39.3772a.0569.0569 0 0 0 .0004.0041 11.0312 11.0312 0 0 0-.2472.3054c-.3389.4302-.4094.5197-1.5002.7443-.3102.064-1.1344.2339-1.1464.8115-.0025.1224.0329.2309.0919.3268.2269.4231.9216.6097 1.015.6331 1.3345.3335 2.5044.092 3.3714-.6787-.017 2.231.0775 4.4174.3454 5.0874.2212.5529.7618 1.9045 2.4692 1.9043.2505 0 .5263-.0291.8296-.0941 1.7819-.3821 2.5557-1.1696 2.855-2.9059.1503-.8707.4016-2.8753.5388-4.1012.0169-.0703.0357-.1207.057-.1362.0007-.0005.0697-.0471.4272.0307a.3673.3673 0 0 0 .0443.0068l.2539.0223.0149.001c.8468.0384 1.9114-.1426 2.5312-.4308.6438-.2988 1.8057-1.0323 1.5951-1.6698zM2.371 11.8765c-.7435-2.4358-1.1779-4.8851-1.2123-5.5719-.1086-2.1714.4171-3.6829 1.5623-4.4927 1.8367-1.2986 4.8398-.5408 6.108-.13-.0032.0032-.0066.0061-.0098.0094-2.0238 2.044-1.9758 5.536-1.9708 5.7495-.0002.0823.0066.1989.0162.3593.0348.5873.0996 1.6804-.0735 2.9184-.1609 1.1504.1937 2.2764.9728 3.0892.0806.0841.1648.1631.2518.2374-.3468.3714-1.1004 1.1926-1.9025 2.1576-.5677.6825-.9597.5517-1.0886.5087-.3919-.1307-.813-.5871-1.2381-1.3223-.4796-.839-.9635-2.0317-1.4155-3.5126zm6.0072 5.0871c-.1711-.0428-.3271-.1132-.4322-.1772.0889-.0394.2374-.0902.4833-.1409 1.2833-.2641 1.4815-.4506 1.9143-1.0002.0992-.126.2116-.2687.3673-.4426a.3549.3549 0 0 0 .0737-.1298c.1708-.1513.2724-.1099.4369-.0417.156.0646.3078.26.3695.4752.0291.1016.0619.2945-.0452.4444-.9043 1.2658-2.2216 1.2494-3.1676 1.0128zm2.094-3.988-.0525.141c-.133.3566-.2567.6881-.3334 1.003-.6674-.0021-1.3168-.2872-1.8105-.8024-.6279-.6551-.9131-1.5664-.7825-2.5004.1828-1.3079.1153-2.4468.079-3.0586-.005-.0857-.0095-.1607-.0122-.2199.2957-.2621 1.6659-.9962 2.6429-.7724.4459.1022.7176.4057.8305.928.5846 2.7038.0774 3.8307-.3302 4.7363-.084.1866-.1633.3629-.2311.5454zm7.3637 4.5725c-.0169.1768-.0358.376-.0618.5959l-.146.4383a.3547.3547 0 0 0-.0182.1077c-.0059.4747-.054.6489-.115.8693-.0634.2292-.1353.4891-.1794 1.0575-.11 1.4143-.8782 2.2267-2.4172 2.5565-1.5155.3251-1.7843-.4968-2.0212-1.2217a6.5824 6.5824 0 0 0-.0769-.2266c-.2154-.5858-.1911-1.4119-.1574-2.5551.0165-.5612-.0249-1.9013-.3302-2.6462.0044-.2932.0106-.5909.019-.8918a.3529.3529 0 0 0-.0153-.1126 1.4927 1.4927 0 0 0-.0439-.208c-.1226-.4283-.4213-.7866-.7797-.9351-.1424-.059-.4038-.1672-.7178-.0869.067-.276.1831-.5875.309-.9249l.0529-.142c.0595-.16.134-.3257.213-.5012.4265-.9476 1.0106-2.2453.3766-5.1772-.2374-1.0981-1.0304-1.6343-2.2324-1.5098-.7207.0746-1.3799.3654-1.7088.5321a5.6716 5.6716 0 0 0-.1958.1041c.0918-1.1064.4386-3.1741 1.7357-4.4823a4.0306 4.0306 0 0 1 .3033-.276.3532.3532 0 0 0 .1447-.0644c.7524-.5706 1.6945-.8506 2.802-.8325.4091.0067.8017.0339 1.1742.081 1.939.3544 3.2439 1.4468 4.0359 2.3827.8143.9623 1.2552 1.9315 1.4312 2.4543-1.3232-.1346-2.2234.1268-2.6797.779-.9926 1.4189.543 4.1729 1.2811 5.4964.1353.2426.2522.4522.2889.5413.2403.5825.5515.9713.7787 1.2552.0696.087.1372.1714.1885.245-.4008.1155-1.1208.3825-1.0552 1.717-.0123.1563-.0423.4469-.0834.8148-.0461.2077-.0702.4603-.0994.7662zm.8905-1.6211c-.0405-.8316.2691-.9185.5967-1.0105a2.8566 2.8566 0 0 0 .135-.0406 1.202 1.202 0 0 0 .1342.103c.5703.3765 1.5823.4213 3.0068.1344-.2016.1769-.5189.3994-.9533.6011-.4098.1903-1.0957.333-1.7473.3636-.7197.0336-1.0859-.0807-1.1721-.151zm.5695-9.2712c-.0059.3508-.0542.6692-.1054 1.0017-.055.3576-.112.7274-.1264 1.1762-.0142.4368.0404.8909.0932 1.3301.1066.887.216 1.8003-.2075 2.7014a3.5272 3.5272 0 0 1-.1876-.3856c-.0527-.1276-.1669-.3326-.3251-.6162-.6156-1.1041-2.0574-3.6896-1.3193-4.7446.3795-.5427 1.3408-.5661 2.1781-.463zm.2284 7.0137a12.3762 12.3762 0 0 0-.0853-.1074l-.0355-.0444c.7262-1.1995.5842-2.3862.4578-3.4385-.0519-.4318-.1009-.8396-.0885-1.2226.0129-.4061.0666-.7543.1185-1.0911.0639-.415.1288-.8443.1109-1.3505.0134-.0531.0188-.1158.0118-.1902-.0457-.4855-.5999-1.938-1.7294-3.253-.6076-.7073-1.4896-1.4972-2.6889-2.0395.5251-.1066 1.2328-.2035 2.0244-.1859 2.0515.0456 3.6746.8135 4.8242 2.2824a.908.908 0 0 1 .0667.1002c.7231 1.3556-.2762 6.2751-2.9867 10.5405zm-8.8166-6.1162c-.025.1794-.3089.4225-.6211.4225a.5821.5821 0 0 1-.0809-.0056c-.1873-.026-.3765-.144-.5059-.3156-.0458-.0605-.1203-.178-.1055-.2844.0055-.0401.0261-.0985.0925-.1488.1182-.0894.3518-.1226.6096-.0867.3163.0441.6426.1938.6113.4186zm7.9305-.4114c.0111.0792-.049.201-.1531.3102-.0683.0717-.212.1961-.4079.2232a.5456.5456 0 0 1-.075.0052c-.2935 0-.5414-.2344-.5607-.3717-.024-.1765.2641-.3106.5611-.352.297-.0414.6111.0088.6356.1851z"},redis:{title:"Redis",d:"M22.71 13.145c-1.66 2.092-3.452 4.483-7.038 4.483-3.203 0-4.397-2.825-4.48-5.12.701 1.484 2.073 2.685 4.214 2.63 4.117-.133 6.94-3.852 6.94-7.239 0-4.05-3.022-6.972-8.268-6.972-3.752 0-8.4 1.428-11.455 3.685C2.59 6.937 3.885 9.958 4.35 9.626c2.648-1.904 4.748-3.13 6.784-3.744C8.12 9.244.886 17.05 0 18.425c.1 1.261 1.66 4.648 2.424 4.648.232 0 .431-.133.664-.365a100.49 100.49 0 0 0 5.54-6.765c.222 3.104 1.748 6.898 6.014 6.898 3.819 0 7.604-2.756 9.33-8.965.2-.764-.73-1.361-1.261-.73zm-4.349-5.013c0 1.959-1.926 2.922-3.685 2.922-.941 0-1.664-.247-2.235-.568 1.051-1.592 2.092-3.225 3.21-4.973 1.972.334 2.71 1.43 2.71 2.619z"},sap:{title:"SAP",d:"M0 6.064v11.872h12.13L24 6.064zm3.264 2.208h.005c.863.001 1.915.245 2.676.633l-.82 1.43c-.835-.404-1.255-.442-1.73-.467-.708-.038-1.064.215-1.069.488-.007.332.669.633 1.305.838.964.306 2.19.715 2.377 1.9L7.77 8.437h2.046l2.064 5.576-.007-5.575h2.37c2.257 0 3.318.764 3.318 2.519 0 1.575-1.09 2.514-2.936 2.514h-.763l-.01 2.094-3.588-.003-.25-.908c-.37.122-.787.189-1.23.189-.456 0-.885-.071-1.263-.2l-.358.919-2 .006.09-.462c-.029.025-.057.05-.087.074-.535.43-1.208.629-2.037.644l-.213.002a5.075 5.075 0 0 1-2.581-.675l.73-1.448c.79.467 1.286.572 1.956.558.347-.007.598-.07.761-.239a.557.557 0 0 0 .156-.369c.007-.376-.53-.553-1.185-.756-.531-.164-1.135-.389-1.606-.735-.559-.41-.825-.924-.812-1.65a1.99 1.99 0 0 1 .566-1.377c.519-.537 1.357-.863 2.363-.863zm10.597 1.67v1.904h.521c.694 0 1.247-.23 1.248-.964 0-.709-.554-.94-1.248-.94zm-5.087.767l-.748 2.362c.223.085.481.133.757.133.268 0 .52-.047.742-.126l-.736-2.37z"},snowflake:{title:"Snowflake",d:"M24 3.459c0 .646-.418 1.18-1.141 1.18-.723 0-1.142-.534-1.142-1.18 0-.647.419-1.18 1.142-1.18.723 0 1.141.533 1.141 1.18zm-.228 0c0-.533-.38-.951-.913-.951s-.913.38-.913.95c0 .533.38.952.913.952.57 0 .913-.419.913-.951zm-1.37-.533h.495c.266 0 .456.152.456.38 0 .153-.076.229-.19.305l.19.266v.038h-.266l-.19-.266h-.229v.266h-.266zm.495.228h-.229v.267h.229c.114 0 .152-.038.152-.114.038-.077-.038-.153-.152-.153zM7.602 12.4c.038-.151.076-.304.076-.456 0-.114-.038-.228-.038-.342-.114-.343-.304-.647-.646-.838l-4.87-2.777c-.685-.38-1.56-.152-1.94.533-.381.685-.153 1.56.532 1.94l2.701 1.56-2.701 1.56c-.685.38-.913 1.256-.533 1.94.38.685 1.256.914 1.94.533l4.832-2.777c.343-.267.571-.533.647-.876zm1.332 2.626c-.266-.038-.57.038-.837.19l-4.832 2.777c-.685.38-.913 1.256-.532 1.94.38.686 1.255.914 1.94.533l2.701-1.56v3.12c0 .8.647 1.408 1.446 1.408.799 0 1.407-.647 1.407-1.408v-5.592c0-.761-.57-1.37-1.293-1.408zm4.946-6.088c.266.038.57-.038.837-.19l4.832-2.777c.685-.38.913-1.256.532-1.94-.38-.686-1.255-.914-1.94-.533l-2.701 1.56V1.975c0-.799-.647-1.408-1.446-1.408-.799 0-1.446.609-1.446 1.408V7.53c0 .76.609 1.37 1.332 1.407zM3.265 5.97l4.832 2.777c.266.152.533.19.837.19.723-.038 1.331-.684 1.331-1.407V1.975c0-.799-.646-1.408-1.407-1.408-.799 0-1.446.647-1.446 1.408v3.12l-2.701-1.56c-.685-.38-1.56-.152-1.94.533-.419.646-.19 1.521.494 1.902zm9.093 6.011a.412.412 0 00-.114-.266l-.57-.571a.346.346 0 00-.267-.114.412.412 0 00-.266.114l-.571.57a.411.411 0 00-.114.267c0 .076.038.19.114.267l.57.57a.345.345 0 00.267.114c.076 0 .19-.038.266-.114l.571-.57a.412.412 0 00.114-.267zm1.598.533L11.94 14.53c-.039.038-.153.114-.229.114h-.608a.411.411 0 01-.267-.114L8.82 12.514a.408.408 0 01-.076-.229v-.608c0-.076.038-.19.114-.267l2.016-2.016a.41.41 0 01.267-.114h.608a.41.41 0 01.267.114l2.016 2.016a.347.347 0 01.114.267v.608c-.076.077-.114.19-.19.229zm5.593 5.44l-4.832-2.777c-.266-.152-.57-.19-.837-.152-.723.038-1.332.684-1.332 1.408v5.554c0 .8.647 1.408 1.408 1.408.799 0 1.446-.647 1.446-1.408v-3.12l2.7 1.56c.686.38 1.561.152 1.941-.533.419-.646.19-1.521-.494-1.94zm2.549-7.533l-2.701 1.56 2.7 1.56c.686.38.914 1.256.533 1.94-.38.685-1.255.913-1.94.533l-4.832-2.778a1.644 1.644 0 01-.647-.798c-.037-.153-.076-.305-.076-.457 0-.114.039-.228.039-.342.114-.343.342-.647.646-.837l4.832-2.778c.685-.38 1.56-.152 1.94.533.457.609.19 1.484-.494 1.864"},stripe:{title:"Stripe",d:"M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z"},zendesk:{title:"Zendesk",d:"M12.914 2.904V16.29L24 2.905H12.914zM0 2.906C0 5.966 2.483 8.45 5.543 8.45s5.542-2.484 5.543-5.544H0zm11.086 4.807L0 21.096h11.086V7.713zm7.37 7.84c-3.063 0-5.542 2.48-5.542 5.543H24c0-3.06-2.48-5.543-5.543-5.543z"}};var um="back.out(1.7)",_n="expo.out",dm={"16x9":{l1:{left:120,top:612},l2:{left:120,top:612},eb:{left:124,top:598},tri:{left:112,top:640},det:{left:124,top:842},cat:{left:1150,top:96,width:660,cardH:92,gap:12,head:46},src:[[170,150],[820,88],[1330,250],[560,372]],tagline:{top:604},cta:{top:712},url:{top:840}},"9x16":{l1:{left:76,top:1190},l2:{left:76,top:1190},eb:{left:80,top:1128},tri:{left:68,top:1170},det:{left:80,top:1520},cat:{left:64,top:780,width:952,cardH:74,gap:8,head:40},src:[[70,250],[560,140],[520,540],[90,790]],tagline:{top:1050},cta:{top:1160},url:{top:1292}}},fm=["snowflake","sap","SF","postgresql","zendesk","jira","SP","googledrive","mongodb","databricks","hubspot","notion","stripe","confluence"],pm=["googlebigquery","mysql","redis","SF","apachekafka","clickhouse","elastic","airtable","snowflake","dropbox","S3","googlecloud","sap","postgresql","databricks","SP"],mm=["Customers","Policies","Claims","Contracts","Support","Suppliers"],wh=["Claims triage copilot","Subrogation finder","Fraud signal agent"],gm='<svg viewBox="0 0 64 40" class="aws"><text x="32" y="23" text-anchor="middle">aws</text><path d="M13 29 q19 9 38 0" /><path d="M45 25.5 l7 3.5 l-6.5 4.5" /></svg>',_m=[{t:.5,name:"AWS",icon:gm,color:"#FF9900"},{t:.75,name:"Snowflake",id:"snowflake",color:"#29B5E8"},{t:1,name:"Databricks",id:"databricks",color:"#FF3621"},{t:1.25,name:"PostgreSQL",id:"postgresql",color:"#6F8FE8"}],xm=["EXTRACT","TYPE","RESOLVE","MASK PII","EMBED"],vm=["DOCUMENTS","TABLES","EMAIL","TICKETS","TRANSCRIPTS","IMAGES","STREAMS"],ym=["Customers","Policies","Claims","Contracts","Support","Suppliers"],vc=[E.beam+.5,E.beam+.75,E.beam+1];function Ah(i,t){let e=nt=>document.querySelector(nt),n=(nt,y=document)=>Array.from(y.querySelectorAll(nt)),s=Pi[t],r=dm[t],a="http://www.w3.org/2000/svg",o=(nt,y,I,z)=>{let $=document.createElement(nt);return y&&($.className=y),z!=null&&($.innerHTML=z),I&&I.appendChild($),$},c=(nt,y)=>{for(let I in y)nt.style[I]=typeof y[I]=="number"?y[I]+"px":y[I]};{let nt=document.createElementNS(a,"svg");nt.setAttribute("width","0"),nt.setAttribute("height","0"),nt.style.position="absolute";let y=document.createElementNS(a,"defs");for(let I in ka){let z=document.createElementNS(a,"symbol");z.setAttribute("id","lg-"+I),z.setAttribute("viewBox","0 0 24 24");let $=document.createElementNS(a,"path");$.setAttribute("d",ka[I].d),z.appendChild($),y.appendChild(z)}nt.appendChild(y),document.getElementById("root").prepend(nt)}let l=nt=>ka[nt]?`<svg viewBox="0 0 24 24"><use href="#lg-${nt}"></use></svg>`:`<b>${nt}</b>`,[u,g,h]=s.glyph;c(e("#l1"),r.l1),c(e("#l2"),r.l2),c(e("#eb"),r.eb),["#w1","#w2","#w3","#w4","#w5"].forEach(nt=>c(e(nt),r.tri)),["#d1","#d2","#d3","#d4","#d5"].forEach(nt=>c(e(nt),r.det));let m=e("#glyph");m.setAttribute("width",String(28*h)),m.setAttribute("height",String(20*h)),c(m,{left:u,top:g}),c(e("#wm-mask"),{left:u+28*h+80*(h/7.2),top:g+10*h-80*(h/7.2)}),e("#wm").style.fontSize=160*(h/7.2)+"px",e("#tagline").style.fontSize=50*(h/8.4)+"px",c(e("#tagline"),{top:r.tagline.top}),c(e("#url"),{top:r.url.top});{let nt=e("#cta"),y=o("div","abs",nt.parentNode);y.id="cta-row",c(y,{left:0,top:r.cta.top,width:s.W,display:"flex",justifyContent:"center"}),y.appendChild(nt),nt.style.position="relative"}function _(nt){let y=[],I=z=>{Array.from(z.childNodes).forEach($=>{if($.nodeType===3){let W=document.createDocumentFragment();$.textContent.split(/(\s+)/).forEach(at=>{if(!at)return;if(/^\s+$/.test(at))return W.appendChild(document.createTextNode(" "));let b=o("span","m"),_t=o("span","w",b);_t.textContent=at,b.setAttribute("data-layout-allow-overlap",""),_t.setAttribute("data-layout-allow-overlap",""),W.appendChild(b),y.push(_t)}),z.replaceChild(W,$)}else $.nodeType===1&&$.tagName!=="BR"&&I($)})};return I(nt),y}function T(nt,y=!0){let I=[],z=$=>{Array.from($.childNodes).forEach(W=>{if(W.nodeType===3){let at=document.createDocumentFragment();for(let b of W.textContent){if(b===" "){at.appendChild(document.createTextNode(" "));continue}let _t=o("span","ch");if(_t.textContent=b,_t.setAttribute("data-layout-allow-overlap",""),y){let pt=o("span","m");pt.setAttribute("data-layout-allow-overlap",""),pt.appendChild(_t),at.appendChild(pt)}else at.appendChild(_t);I.push(_t)}$.replaceChild(at,W)}else W.nodeType===1&&W.tagName!=="BR"&&z(W)})};return z(nt),I}let p=(nt,y,{dur:I=.6,stagger:z=.04,e:$=_n,from:W=108}={})=>i.fromTo(nt,{yPercent:W,opacity:0},{yPercent:0,opacity:1,duration:I,stagger:z,ease:$,immediateRender:!0},y),f=(nt,y,{dur:I=.26,stagger:z=.02,to:$=-108}={})=>i.to(nt,{yPercent:$,opacity:0,duration:I,stagger:z,ease:"power3.in"},y);{let nt=e("#l1"),y=nt.querySelector(".it"),I=y.textContent;y.textContent="";let z=_(nt);y.textContent=I;let $=T(y,!1);z.forEach((at,b)=>p(at,E.line1+b*.125,{dur:.55}));let W=(at,b)=>Se(at*31+b)*2-1;$.forEach((at,b)=>{i.fromTo(at,{x:W(b,1)*90,y:60+W(b,2)*50,rotation:W(b,3)*25,opacity:0,filter:"blur(10px)"},{x:0,y:0,rotation:0,opacity:1,filter:"blur(0px)",duration:.7,ease:_n,immediateRender:!0},2+b*.012),i.to(at,{x:W(b,4)*260,y:-40+W(b,5)*160,rotation:W(b,6)*70,opacity:0,filter:"blur(8px)",duration:.34,ease:"power3.in"},3.64+b*.01)}),f(z,3.62,{stagger:.03})}let R=e("#l2 .it");{let nt=_(e("#l2")),y=[4,4.125,4.5,4.625,4.75];nt.forEach((I,z)=>p(I,y[z],{dur:.5})),i.to("#l2",{opacity:.55,duration:.12,ease:"power2.out"},E.stop),i.to("#l2",{scale:.94,opacity:0,filter:"blur(6px)",transformOrigin:"30% 60%",duration:.24,ease:"power3.in"},E.drop-.25)}let P=[E.drop,E.pipe,E.graph,E.uses,E.beam],S=[E.pipe,E.graph,E.uses,E.beam,E.fold];["#w1","#w2","#w3","#w4","#w5"].map(nt=>T(e(nt))).forEach((nt,y)=>{p(nt,P[y],{dur:.62,stagger:.016,from:112}),i.fromTo(nt[0].closest(".tri"),{scale:1.06,transformOrigin:"0% 100%"},{scale:1,duration:.8,ease:_n,immediateRender:!0},P[y]),f(nt,S[y]-.3,{dur:.18,stagger:.006})}),i.fromTo("#eb i",{scaleX:0},{scaleX:1,duration:.5,ease:_n,immediateRender:!0},E.drop),i.fromTo("#eb",{opacity:0},{opacity:1,duration:.2,immediateRender:!0},E.drop),i.to("#eb",{opacity:0,duration:.2},E.fold-.2);let w=_m.map((nt,y)=>{let I=o("div","src",e("#s-src")),z=nt.icon||`<svg viewBox="0 0 24 24" style="fill:${nt.color}"><use href="#lg-${nt.id}"></use></svg>`;I.innerHTML=`<span class="ico" style="--c:${nt.color}">${z}</span><span class="nm">${nt.name}</span>`,I.style.setProperty("--c",nt.color),c(I,{left:r.src[y][0],top:r.src[y][1]});let $=W=>Se(y*17+W)*2-1;return i.fromTo(I,{scale:.55,opacity:0,y:30,filter:"blur(12px)",transformOrigin:"50% 50%"},{scale:1,opacity:1,y:0,filter:"blur(0px)",duration:.6,ease:"back.out(1.8)",immediateRender:!0},nt.t),i.to(I,{x:$(1)*36,y:$(2)*22,duration:3.55-nt.t,ease:"sine.inOut"},nt.t+.6),i.to(I,{x:$(3)*420,y:-120+$(4)*200,rotation:$(5)*18,opacity:0,filter:"blur(10px)",duration:.36,ease:"power3.in"},3.6+y*.03),I}),L=e("#over"),x=xm.map(nt=>{let y=o("div","anc",L);return o("div","gate",y,nt),y.style.opacity="0",y}),C=vm.map(nt=>{let y=o("div","anc",L);return o("div","lane",y,nt),y.style.opacity="0",y}),F=r.cat,q=e("#cat");c(q,{position:"absolute",left:F.left,top:F.top,width:F.width});let O=o("div","cat-h",q,'<span>USE-CASE CATALOG</span><span class="n"><b>3</b> ready \xB7 <i>1</i> blocked</span>');c(O,{height:F.head});let Z=Ws.map((nt,y)=>{let I=nt.status==="ready",z=o("div","uc"+(I?"":" blocked"),q,`<div class="top"><span class="nm">${nt.name}</span><span class="val">${I?`<b>${nt.value}</b><small>/ yr</small>`:"<b>\u2014</b>"}</span></div><div class="bot"><span class="srcs">${nt.domains.map($=>ym[$].toUpperCase()).join(" \xB7 ")}</span><span class="st"><i></i>${I?"Ready to build":"Blocked \xB7 Contracts not ready"}</span></div>`);return c(z,{height:F.cardH,marginBottom:F.gap}),i.fromTo(z,{x:46,opacity:0,filter:"blur(8px)"},{x:0,opacity:1,filter:"blur(0px)",duration:.55,ease:_n,immediateRender:!0},nt.t),i.to(z,{x:30,opacity:0,duration:.25,ease:"power3.in"},E.beam-.35+y*.04),{card:z,uc:nt,valEl:z.querySelector(".val b"),y:F.top+F.head+y*(F.cardH+F.gap)+F.cardH/2}}),D=o("div","cat-f",q,"Example use cases and values \xB7 illustrative estate");i.fromTo(O,{y:12,opacity:0},{y:0,opacity:1,duration:.45,ease:_n,immediateRender:!0},E.uses+.2),i.fromTo(O.querySelector(".n"),{opacity:0},{opacity:1,duration:.3,immediateRender:!0},E.uses+2.3),i.fromTo(D,{opacity:0},{opacity:1,duration:.4,immediateRender:!0},E.uses+2.4),i.to([O,D],{opacity:0,duration:.25},E.beam-.3);let H=document.createElementNS(a,"svg");H.setAttribute("class","wires"),H.setAttribute("width",String(s.W)),H.setAttribute("height",String(s.H)),L.prepend(H);let et=[];Z.forEach((nt,y)=>nt.uc.domains.forEach(I=>{let z=document.createElementNS(a,"path");z.setAttribute("pathLength","1"),z.setAttribute("class",nt.uc.status==="ready"?"w":"w bad"),H.appendChild(z),et.push({p:z,k:y,d:I,u:nt})}));let k=nt=>{let y=o("div","anc",L),I=o("div","tile",y,l(nt));return y.style.opacity="0",{a:y,tile:I}},ct=fm.map(k),ot=pm.map(k),j=mm.map(nt=>{let y=o("div","anc",L),I=o("div","dom",y,`<i></i>${nt.toUpperCase()}`);return y.style.opacity="0",{a:y,inner:I}}),rt=(()=>{let nt=o("div","anc",L),y=o("div","agent",nt,'<span class="k">AI AGENT</span><span class="s"></span>');return nt.style.opacity="0",{a:nt,box:y,s:y.querySelector(".s")}})(),It='<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>',Pt=t==="9x16",ie=wh.map((nt,y)=>{let I=o("div","anc",L),z=o("div","stem"+(Pt?" h":""),I),$=o("div","chip",I,`<span class="ic">${It}</span><span class="n">${nt}</span><span class="r">READY</span>`);if(Pt)c(z,{width:46}),c($,{left:46,top:-30});else{let W=70+(wh.length-1-y)*86;c(z,{height:W}),c($,{top:W})}return I.style.opacity="0",{a:I,c:$,stem:z}});ie.forEach((nt,y)=>{i.fromTo(nt.stem,Pt?{scaleX:0}:{scaleY:0},{scaleX:1,scaleY:1,duration:.3,ease:"power3.out",immediateRender:!0},vc[y]-.12),i.fromTo(nt.c,{scale:.6,y:-14,opacity:0,transformOrigin:"0% 0%"},{scale:1,y:0,opacity:1,duration:.55,ease:um,immediateRender:!0},vc[y]),i.to(nt.c,{scale:.9,opacity:0,y:-10,duration:.25,ease:"power3.in"},E.fold-.1+y*.04)}),j.forEach((nt,y)=>{i.fromTo(nt.inner,{x:-16,opacity:0},{x:0,opacity:1,duration:.45,ease:_n,immediateRender:!0},E.graph+.18+y*.125),i.to(nt.inner,{opacity:0,x:10,duration:.25,ease:"power2.in"},E.beam-.05+y*.03)}),i.fromTo(rt.box,{x:-14,opacity:0},{x:0,opacity:1,duration:.4,ease:_n,immediateRender:!0},E.agent+.2),i.to(rt.box,{opacity:0,duration:.2},E.drop-.2),i.fromTo("#scrim",{opacity:0},{opacity:1,duration:.5,ease:"power1.out",immediateRender:!0},1.25),i.to("#scrim",{opacity:.55,duration:.3},E.drop),i.to("#scrim",{opacity:0,duration:.6},E.fold-.3);let Vt=T(e("#wm"),!1);i.fromTo("#glyph",{opacity:0},{opacity:1,duration:.22,ease:"power1.inOut",immediateRender:!0},E.lock-.1),i.fromTo(Vt,{x:-70,opacity:0,filter:"blur(8px)"},{x:0,opacity:1,filter:"blur(0px)",duration:.7,stagger:.03,ease:_n,immediateRender:!0},E.lock+.02),n("#tagline .p").forEach((nt,y)=>i.fromTo(nt,{y:26,opacity:0},{y:0,opacity:1,duration:.6,ease:_n,immediateRender:!0},E.lock+.5+y*.25)),i.fromTo("#cta",{scale:.82,opacity:0,y:20},{scale:1,opacity:1,y:0,duration:.65,ease:"back.out(1.5)",immediateRender:!0},E.cta),i.fromTo("#cta svg",{x:-12},{x:0,duration:.5,ease:"back.out(3)",immediateRender:!0},E.cta+.25),i.fromTo("#cta .sheen",{x:-140},{x:1e3,duration:.9,ease:"power2.inOut",immediateRender:!0},E.cta+1.1),i.fromTo("#url",{opacity:0,y:12},{opacity:1,y:0,duration:.5,ease:_n,immediateRender:!0},E.cta+.3),i.fromTo("#s-lock",{scale:1},{scale:1.018,duration:E.end-E.lock,ease:"sine.inOut",transformOrigin:"50% 50%",immediateRender:!0},E.lock);let it=document.getElementById("g-run");i.set("#g-glint",{opacity:1},E.lock+1.8),i.fromTo(it,{attr:{x1:-8,x2:0}},{attr:{x1:16,x2:24},duration:1.1,ease:"power2.inOut",immediateRender:!0},E.lock+1.8),i.set("#g-glint",{opacity:0},E.lock+2.95),i.set("#g-glint",{opacity:1},E.lock+4.1),i.fromTo(it,{attr:{x1:-8,x2:0}},{attr:{x1:16,x2:24},duration:1.1,ease:"power2.inOut",immediateRender:!1},E.lock+4.1),i.set("#g-glint",{opacity:0},E.lock+5.25),i.to("#cta svg",{x:9,duration:.16,ease:"power2.out"},E.lock+4),i.to("#cta svg",{x:0,duration:.5,ease:"back.out(3)"},E.lock+4.16),i.fromTo("#cta .sheen",{x:-140},{x:1e3,duration:.9,ease:"power2.inOut",immediateRender:!1},E.lock+4.9);let ht=["#d1","#d2","#d3","#d4","#d5"].map(nt=>{let y=e(nt),I=y.querySelector(".txt"),z=I.textContent,$=o("span","cur",y);return{n:y,txt:I,full:z,cur:$}}),At=e("#eb-n"),Gt=e("#grain"),Et="0123456789",Xt=t==="9x16"?{x0:40,y0:1080,x1:1040,y1:1640}:{x0:80,y0:570,x1:1560,y1:910},ce=nt=>{let y=Math.max(Xt.x0-nt.x,0,nt.x-Xt.x1),I=Math.max(Xt.y0-nt.y,0,nt.y-Xt.y1);return Yt(0,70,Math.hypot(y,I))};function Ht(nt,y,I,z){if(y&&y.on&&(I*=ce(y)),!y||!y.on||I<=.01||y.x<-80||y.x>s.W+80||y.y<-80||y.y>s.H+80){nt.a.style.opacity="0";return}nt.a.style.opacity=I.toFixed(3),nt.a.style.transform=`translate(${y.x.toFixed(1)}px, ${y.y.toFixed(1)}px) scale(${z.toFixed(3)})`}function $t(nt,y){let I=Math.round(y*30);ct.forEach(($,W)=>{let at=nt.tags[W];if(!at||y>E.drop+.05)return Ht($,null,0,1);let b=Yt(250,520,at.depth)*(1-Yt(2600,3600,at.depth)),_t=De(at.I*1.6)*b*(1-Yt(E.stop-.05,E.stop+.1,y)*.6)*(1-Yt(E.drop-.12,E.drop,y));Ht($,at,_t,De(at.ppu*2.4,.72,1.5))}),ot.forEach(($,W)=>{let at=nt.ftags&&nt.ftags[W];if(!at)return Ht($,null,0,1);let b=Yt(E.drop+.12+W*.03,E.drop+.3+W*.03,y)*Yt(160,420,at.depth)*(1-Yt(4200,6400,at.depth))*(1-Yt(E.pipe-.4,E.pipe-.15,y));Ht($,at,b,De(at.ppu*2.8,.6,2.4))});let z=Yt(E.pipe+.05,E.pipe+.35,y)*(1-Yt(E.graph-.6,E.graph-.35,y));x.forEach(($,W)=>{let at=nt.gates&&nt.gates[W],b=at&&at.on?z*Yt(E.pipe-.1+W*.08,E.pipe+.2+W*.08,y):0;$.style.opacity=b.toFixed(3),b>0&&($.style.transform=`translate(${at.x.toFixed(1)}px, ${at.y.toFixed(1)}px)`)}),C.forEach(($,W)=>{let at=nt.lanes&&nt.lanes[W],b=at&&at.on?z*ce(at):0;$.style.opacity=b.toFixed(3),b>0&&($.style.transform=`translate(${at.x.toFixed(1)}px, ${at.y.toFixed(1)}px)`)}),Z.forEach($=>{if(!$.valEl||$.uc.status!=="ready")return;let W=parseFloat($.uc.value.replace(/[^0-9.]/g,"")),at=($.uc.value.split(".")[1]||"").replace(/[^0-9]/g,"").length,b=W*Math.min(1,Math.max(0,(y-$.uc.t-.05)/.5))**.6;$.valEl.textContent="$"+b.toFixed(at)+"M"}),et.forEach($=>{let W=nt.labels[$.d],at=De((y-$.u.uc.t+.18)/.4),b=1-Yt(E.beam-.5,E.beam-.2,y);if(!W||!W.on||at<=0||b<=0)return $.p.setAttribute("d","");let _t=F.left-10,pt=$.u.y,M=(W.x+_t)/2;$.p.setAttribute("d",`M${W.x.toFixed(1)} ${W.y.toFixed(1)} C${M.toFixed(1)} ${W.y.toFixed(1)}, ${M.toFixed(1)} ${pt.toFixed(1)}, ${_t} ${pt.toFixed(1)}`),$.p.style.strokeDashoffset=(1-at).toFixed(3),$.p.style.opacity=(b*(.45+.55*Math.exp(-Math.max(0,y-$.u.uc.t)*1.2))).toFixed(3)}),j.forEach(($,W)=>{let at=nt.labels[W];if(!(y>E.graph+.1&&y<E.beam+.3?1:0)||!at.on)return $.a.style.opacity="0";$.a.style.opacity="1",$.a.style.transform=`translate(${at.x.toFixed(1)}px, ${at.y.toFixed(1)}px)`});{let $=nt.agent,W=y>E.agent&&y<E.drop;rt.a.style.opacity=W?"1":"0",W&&(rt.a.style.transform=`translate(${$.x.toFixed(1)}px, ${$.y.toFixed(1)}px)`);let at=y>=E.fail,b="searching the estate\u2026",_t="no usable context",pt=at?_t.length:Math.floor(De((y-E.probe)*42,0,b.length));if(rt.s.textContent=at?_t:b.slice(0,pt),rt.s.className="s"+(at?" bad":""),at&&y<E.stop){let M=Se(I*7);rt.box.style.transform=M<.4?`translateX(${((Se(I)-.5)*14).toFixed(1)}px)`:""}}if(ie.forEach(($,W)=>{let at=nt.stations[W],b=y>vc[W]-.15&&y<E.fold+.3&&at.on;$.a.style.opacity=b?"1":"0",b&&($.a.style.transform=`translate(${at.x.toFixed(1)}px, ${at.y.toFixed(1)}px)`)}),y>=E.fail&&y<E.stop+.04){let $=Se(I*13+5),W=(Se(I*3+1)-.5)*18;R.style.textShadow=$<.55?`${(W*.6).toFixed(1)}px 0 0 rgba(255,70,40,0.85), ${(-W*.6).toFixed(1)}px 0 0 rgba(60,160,255,0.85)`:"none",R.style.transform=$<.35?`translateX(${W.toFixed(1)}px) skewX(${((Se(I)-.5)*12).toFixed(1)}deg)`:"none"}else R.style.textShadow="none",R.style.transform="none";{let $=0;P.forEach((b,_t)=>{y>=b&&($=_t)});let W=y-P[$],at="0"+($+1);At.textContent=W<.28?Et[Math.floor(Se(I*5)*10)]+Et[Math.floor(Se(I*9+2)*10)]:at}ht.forEach(($,W)=>{let at=P[W]+.3,b=S[W]-.4,_t=Math.floor(De((y-at)*60,0,$.full.length)),pt=Math.floor(De((y-b)*90,0,$.full.length)),M=Math.max(0,_t-pt),d=y>at-.05&&y<b+.35;$.n.style.opacity=d?"1":"0",$.txt.textContent=$.full.slice(0,M),$.cur.style.opacity=d&&(Math.floor(y*4)%2===0||M>0&&M<$.full.length)?"1":"0"}),Gt.style.transform=`translate(${Math.floor(Se(I)*64)}px, ${Math.floor(Se(I+999)*64)}px)`}return{place:$t}}window.__buildFilm=function(){let t=window.gsap,n=document.getElementById("root").dataset.aspect||"16x9",s=t.timeline({paused:!0}),r=Th(document.getElementById("gl"),n);window.__world=r;let a=Ah(s,n),o={t:0},c=()=>a.place(r.render(o.t),o.t);return s.to(o,{t:26,duration:26,ease:"none",onUpdate:c},0),c(),s};})();
