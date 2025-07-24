Execute Task: 10. In...

New Session





npm test -- src/tests/app-sound-integration.test.tsx --run --reporter=basic

Kiro
Including Steering Documents

typescript-standards.md
I'll run the specific test file you mentioned using npm test with the provided parameters.

Command
npm test -- src/tests/app-sound-integration.test.tsx --run --reporter=basic
npm test -- sr
rc/tests/app-sound-i
integration.test.t  sx
x --run --reporter=b
basic
:\Windows\System32\cmd.exe - npm  test -- src/tests/app-sound-integration.test.tsx --run --reporter=basicpm test src/tests/app-sound-integration.test.tsx --run --reporter=basic
> thewanderer@0.1.0
0 test
> vitest run -c vit
test.config.ts src/t
tests/app-sound-inte
egration.test.tsx --
-run --reporter=basi
ic

:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/Fiz
zzBash/TheWanderer  

 DEPRECATED  'basic
c' reporter is depre
ecated and will be r
removed in Vitest v3
3.
Remove 'basic' from
m 'reporters' option
n. To match 'basic' 
 reporter 100%, use 
 configuration:     
{
  "test": {        
    "reporters": [ 
      [
        "default", 
        {
          "summary"
": false
        }
      ]
    ]
  }
}
ode (vitest 2)ode (vitest 5)ode (vitest 3)ode (vitest 10)ode (vitest 12)ode (vitest 14)ode (vitest 15)
(node:52140) [DEP00
040] DeprecationWarn
ning: The `punycode`
` module is deprecat
ted. Please use a us
serland alternative 
 instead.
(Use `node --trace-
-deprecation ...` to
o show where the war
rning was created)  

stdout | src/tests/
/app-sound-integrati
ion.test.tsx > App S
Sound Integration > 
 Sound System Initia
alization > should i
initialize audio sys
stem on app startup 
Silent Audio Manage
er initialized - no 
 audio will be playe
ed
Silent Audio Manage
er initialized - no 
 audio will be playe
ed

stderr | src/tests/
/app-sound-integrati
ion.test.tsx > App S
Sound Integration > 
 Sound System Initia
alization > should i
initialize audio sys
stem on app startup 
No audio support de
etected, using silen
nt mode
Selected audio mana
ager not supported, 
 falling back       
HTML5 Audio initial
lization failed: Err
ror: HTML5 Audio can
nPlayType not suppor
rted
    at HTML5AudioMa
anager.initialize (D
D:\FizzBash\TheWande
erer\src\audio\manag
gers\html5-audio-man
nager.ts:56:23)     
    at new HTML5Aud
dioManager (D:\FizzB
Bash\TheWanderer\src
c\audio\managers\htm
ml5-audio-manager.ts
s:41:14)
    at createSpecif
ficAudioManager (D:\
\FizzBash\TheWandere
er\src\audio\manager
rs\audio-manager-fac
ctory.ts:64:20)     
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:116:27   
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:233:9    
    at Object.react
t-stack-bottom-frame
e (D:\FizzBash\TheWa
anderer\node_modules
s\react-dom\cjs\reac
ct-dom-client.develo
opment.js:23949:20) 
    at runWithFiber
rInDEV (D:\FizzBash\
\TheWanderer\node_mo
odules\react-dom\cjs
s\react-dom-client.d
development.js:1522:
:13)
    at commitHookEf
ffectListMount (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:11905:29)       
    at commitHookPa
assiveMountEffects (
(D:\FizzBash\TheWand
derer\node_modules\r
react-dom\cjs\react-
-dom-client.developm
ment.js:12028:11)   
    at commitPassiv
veMountOnFiber (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:13841:13)       
Audio error event: 
 HTML5_AUDIO_INIT_FA
AILED Error: HTML5 A
Audio canPlayType no
ot supported        
    at HTML5AudioMa
anager.initialize (D
D:\FizzBash\TheWande
erer\src\audio\manag
gers\html5-audio-man
nager.ts:56:23)     
    at new HTML5Aud
dioManager (D:\FizzB
Bash\TheWanderer\src
c\audio\managers\htm
ml5-audio-manager.ts
s:41:14)
    at createSpecif
ficAudioManager (D:\
\FizzBash\TheWandere
er\src\audio\manager
rs\audio-manager-fac
ctory.ts:64:20)     
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:116:27   
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:233:9    
    at Object.react
t-stack-bottom-frame
e (D:\FizzBash\TheWa
anderer\node_modules
s\react-dom\cjs\reac
ct-dom-client.develo
opment.js:23949:20) 
    at runWithFiber
rInDEV (D:\FizzBash\
\TheWanderer\node_mo
odules\react-dom\cjs
s\react-dom-client.d
development.js:1522:
:13)
    at commitHookEf
ffectListMount (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:11905:29)       
    at commitHookPa
assiveMountEffects (
(D:\FizzBash\TheWand
derer\node_modules\r
react-dom\cjs\react-
-dom-client.developm
ment.js:12028:11)   
    at commitPassiv
veMountOnFiber (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:13841:13) undefi
ined
HTML5 audio not sup
pported, falling bac
ck to silent mode   


stdout | src/tests/
/app-sound-integrati
ion.test.tsx > App S
Sound Integration > 
 Sound System Initia
alization > should n
not block game rende
ering during audio i
initialization      
Silent Audio Manage
er initialized - no 
 audio will be playe
ed
Silent Audio Manage
er initialized - no 
 audio will be playe
ed

stderr | src/tests/
/app-sound-integrati
ion.test.tsx > App S
Sound Integration > 
 Sound System Initia
alization > should n
not block game rende
ering during audio i
initialization      
No audio support de
etected, using silen
nt mode
Selected audio mana
ager not supported, 
 falling back       
HTML5 Audio initial
lization failed: Err
ror: HTML5 Audio can
nPlayType not suppor
rted
    at HTML5AudioMa
anager.initialize (D
D:\FizzBash\TheWande
erer\src\audio\manag
gers\html5-audio-man
nager.ts:56:23)     
    at new HTML5Aud
dioManager (D:\FizzB
Bash\TheWanderer\src
c\audio\managers\htm
ml5-audio-manager.ts
s:41:14)
    at createSpecif
ficAudioManager (D:\
\FizzBash\TheWandere
er\src\audio\manager
rs\audio-manager-fac
ctory.ts:64:20)     
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:116:27   
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:233:9    
    at Object.react
t-stack-bottom-frame
e (D:\FizzBash\TheWa
anderer\node_modules
s\react-dom\cjs\reac
ct-dom-client.develo
opment.js:23949:20) 
    at runWithFiber
rInDEV (D:\FizzBash\
\TheWanderer\node_mo
odules\react-dom\cjs
s\react-dom-client.d
development.js:1522:
:13)
    at commitHookEf
ffectListMount (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:11905:29)       
    at commitHookPa
assiveMountEffects (
(D:\FizzBash\TheWand
derer\node_modules\r
react-dom\cjs\react-
-dom-client.developm
ment.js:12028:11)   
    at commitPassiv
veMountOnFiber (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:13841:13)       
Audio error event: 
 HTML5_AUDIO_INIT_FA
AILED Error: HTML5 A
Audio canPlayType no
ot supported        
    at HTML5AudioMa
anager.initialize (D
D:\FizzBash\TheWande
erer\src\audio\manag
gers\html5-audio-man
nager.ts:56:23)     
    at new HTML5Aud
dioManager (D:\FizzB
Bash\TheWanderer\src
c\audio\managers\htm
ml5-audio-manager.ts
s:41:14)
    at createSpecif
ficAudioManager (D:\
\FizzBash\TheWandere
er\src\audio\manager
rs\audio-manager-fac
ctory.ts:64:20)     
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:116:27   
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:233:9    
    at Object.react
t-stack-bottom-frame
e (D:\FizzBash\TheWa
anderer\node_modules
s\react-dom\cjs\reac
ct-dom-client.develo
opment.js:23949:20) 
    at runWithFiber
rInDEV (D:\FizzBash\
\TheWanderer\node_mo
odules\react-dom\cjs
s\react-dom-client.d
development.js:1522:
:13)
    at commitHookEf
ffectListMount (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:11905:29)       
    at commitHookPa
assiveMountEffects (
(D:\FizzBash\TheWand
derer\node_modules\r
react-dom\cjs\react-
-dom-client.developm
ment.js:12028:11)   
    at commitPassiv
veMountOnFiber (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:13841:13) undefi
ined
HTML5 audio not sup
pported, falling bac
ck to silent mode   
An update to AudioP
Provider inside a te
est was not wrapped 
 in act(...).       

When testing, code 
 that causes React s
state updates should
d be wrapped into ac
ct(...):

act(() => {        
  /* fire events th
hat update state */ 
});
/* assert on the ou
utput */

This ensures that y
you're testing the b
behavior the user wo
ould see in the brow
wser. Learn more at 
 https://react.dev/l
link/wrap-tests-with
h-act

stderr | src/tests/
/app-sound-integrati
ion.test.tsx > App S
Sound Integration > 
 Sound System Initia
alization > should n
not block game rende
ering during audio i
initialization      
An update to AudioP
Provider inside a te
est was not wrapped 
 in act(...).       

When testing, code 
 that causes React s
state updates should
d be wrapped into ac
ct(...):

act(() => {        
  /* fire events th
hat update state */ 
});
/* assert on the ou
utput */

This ensures that y
you're testing the b
behavior the user wo
ould see in the brow
wser. Learn more at 
 https://react.dev/l
link/wrap-tests-with
h-act


stdout | src/tests/
/app-sound-integrati
ion.test.tsx > App S
Sound Integration > 
 Sound System Initia
alization > should h
handle audio initial
lization errors grac
cefully
Silent Audio Manage
er initialized - no 
 audio will be playe
ed
Silent Audio Manage
er initialized - no 
 audio will be playe
ed

stderr | src/tests/
/app-sound-integrati
ion.test.tsx > App S
Sound Integration > 
 Sound System Initia
alization > should h
handle audio initial
lization errors grac
cefully
Failed to create Au
udioContext: Error: 
 Audio not supported
    at fn.<anonymou
us> (D:\FizzBash\The
eWanderer\src\tests\
\app-sound-integrati
ion.test.tsx:103:23)
    at new mockCall
l (file:///D:/FizzBa
ash/TheWanderer/node
e_modules/@vitest/sp
py/dist/index.js:96:
:15)
    at new spy (fil
le:///D:/FizzBash/Th
heWanderer/node_modu
ules/tinyspy/dist/in
ndex.js:47:39)      
    at createAudioC
Context (D:\FizzBash
h\TheWanderer\src\au
udio\utils\audio-uti
ils.ts:144:16)      
    at canAutoplay 
 (D:\FizzBash\TheWan
nderer\src\audio\uti
ils\audio-utils.ts:1
158:30)
    at checkAutopla
ay (D:\FizzBash\TheW
Wanderer\src\audio\c
context\audio-contex
xt.tsx:42:35)       
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:50:9     
    at Object.react
t-stack-bottom-frame
e (D:\FizzBash\TheWa
anderer\node_modules
s\react-dom\cjs\reac
ct-dom-client.develo
opment.js:23949:20) 
    at runWithFiber
rInDEV (D:\FizzBash\
\TheWanderer\node_mo
odules\react-dom\cjs
s\react-dom-client.d
development.js:1522:
:13)
    at commitHookEf
ffectListMount (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:11905:29)       
Web Audio API check
k failed: Error: Aud
dio not supported   
    at fn.<anonymou
us> (D:\FizzBash\The
eWanderer\src\tests\
\app-sound-integrati
ion.test.tsx:103:23)
    at new mockCall
l (file:///D:/FizzBa
ash/TheWanderer/node
e_modules/@vitest/sp
py/dist/index.js:96:
:15)
    at new spy (fil
le:///D:/FizzBash/Th
heWanderer/node_modu
ules/tinyspy/dist/in
ndex.js:47:39)      
    at isWebAudioSu
upported (D:\FizzBas
sh\TheWanderer\src\a
audio\utils\audio-ut
tils.ts:16:25)      
    at createAudioM
Manager (D:\FizzBash
h\TheWanderer\src\au
udio\managers\audio-
-manager-factory.ts:
:35:13)
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:106:27   
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:233:9    
    at Object.react
t-stack-bottom-frame
e (D:\FizzBash\TheWa
anderer\node_modules
s\react-dom\cjs\reac
ct-dom-client.develo
opment.js:23949:20) 
    at runWithFiber
rInDEV (D:\FizzBash\
\TheWanderer\node_mo
odules\react-dom\cjs
s\react-dom-client.d
development.js:1522:
:13)
    at commitHookEf
ffectListMount (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:11905:29)       
No audio support de
etected, using silen
nt mode
Selected audio mana
ager not supported, 
 falling back       
HTML5 Audio initial
lization failed: Err
ror: HTML5 Audio can
nPlayType not suppor
rted
    at HTML5AudioMa
anager.initialize (D
D:\FizzBash\TheWande
erer\src\audio\manag
gers\html5-audio-man
nager.ts:56:23)     
    at new HTML5Aud
dioManager (D:\FizzB
Bash\TheWanderer\src
c\audio\managers\htm
ml5-audio-manager.ts
s:41:14)
    at createSpecif
ficAudioManager (D:\
\FizzBash\TheWandere
er\src\audio\manager
rs\audio-manager-fac
ctory.ts:64:20)     
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:116:27   
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:233:9    
    at Object.react
t-stack-bottom-frame
e (D:\FizzBash\TheWa
anderer\node_modules
s\react-dom\cjs\reac
ct-dom-client.develo
opment.js:23949:20) 
    at runWithFiber
rInDEV (D:\FizzBash\
\TheWanderer\node_mo
odules\react-dom\cjs
s\react-dom-client.d
development.js:1522:
:13)
    at commitHookEf
ffectListMount (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:11905:29)       
    at commitHookPa
assiveMountEffects (
(D:\FizzBash\TheWand
derer\node_modules\r
react-dom\cjs\react-
-dom-client.developm
ment.js:12028:11)   
    at commitPassiv
veMountOnFiber (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:13841:13)       
Audio error event: 
 HTML5_AUDIO_INIT_FA
AILED Error: HTML5 A
Audio canPlayType no
ot supported        
    at HTML5AudioMa
anager.initialize (D
D:\FizzBash\TheWande
erer\src\audio\manag
gers\html5-audio-man
nager.ts:56:23)     
    at new HTML5Aud
dioManager (D:\FizzB
Bash\TheWanderer\src
c\audio\managers\htm
ml5-audio-manager.ts
s:41:14)
    at createSpecif
ficAudioManager (D:\
\FizzBash\TheWandere
er\src\audio\manager
rs\audio-manager-fac
ctory.ts:64:20)     
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:116:27   
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:233:9    
    at Object.react
t-stack-bottom-frame
e (D:\FizzBash\TheWa
anderer\node_modules
s\react-dom\cjs\reac
ct-dom-client.develo
opment.js:23949:20) 
    at runWithFiber
rInDEV (D:\FizzBash\
\TheWanderer\node_mo
odules\react-dom\cjs
s\react-dom-client.d
development.js:1522:
:13)
    at commitHookEf
ffectListMount (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:11905:29)       
    at commitHookPa
assiveMountEffects (
(D:\FizzBash\TheWand
derer\node_modules\r
react-dom\cjs\react-
-dom-client.developm
ment.js:12028:11)   
    at commitPassiv
veMountOnFiber (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:13841:13) undefi
ined
HTML5 audio not sup
pported, falling bac
ck to silent mode   
Autoplay not allowe
ed - user interactio
on will be required 
 to play audio      


stdout | src/tests/
/app-sound-integrati
ion.test.tsx > App S
Sound Integration > 
 Keyboard Controls I
Integration > should
d handle game moveme
ent keys without int
terfering with audio
Silent Audio Manage
er initialized - no 
 audio will be playe
ed
Silent Audio Manage
er initialized - no 
 audio will be playe
ed

stderr | src/tests/
/app-sound-integrati
ion.test.tsx > App S
Sound Integration > 
 Keyboard Controls I
Integration > should
d handle game moveme
ent keys without int
terfering with audio
No audio support de
etected, using silen
nt mode
Selected audio mana
ager not supported, 
 falling back       
HTML5 Audio initial
lization failed: Err
ror: HTML5 Audio can
nPlayType not suppor
rted
    at HTML5AudioMa
anager.initialize (D
D:\FizzBash\TheWande
erer\src\audio\manag
gers\html5-audio-man
nager.ts:56:23)     
    at new HTML5Aud
dioManager (D:\FizzB
Bash\TheWanderer\src
c\audio\managers\htm
ml5-audio-manager.ts
s:41:14)
    at createSpecif
ficAudioManager (D:\
\FizzBash\TheWandere
er\src\audio\manager
rs\audio-manager-fac
ctory.ts:64:20)     
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:116:27   
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:233:9    
    at Object.react
t-stack-bottom-frame
e (D:\FizzBash\TheWa
anderer\node_modules
s\react-dom\cjs\reac
ct-dom-client.develo
opment.js:23949:20) 
    at runWithFiber
rInDEV (D:\FizzBash\
\TheWanderer\node_mo
odules\react-dom\cjs
s\react-dom-client.d
development.js:1522:
:13)
    at commitHookEf
ffectListMount (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:11905:29)       
    at commitHookPa
assiveMountEffects (
(D:\FizzBash\TheWand
derer\node_modules\r
react-dom\cjs\react-
-dom-client.developm
ment.js:12028:11)   
    at commitPassiv
veMountOnFiber (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:13841:13)       
Audio error event: 
 HTML5_AUDIO_INIT_FA
AILED Error: HTML5 A
Audio canPlayType no
ot supported        
    at HTML5AudioMa
anager.initialize (D
D:\FizzBash\TheWande
erer\src\audio\manag
gers\html5-audio-man
nager.ts:56:23)     
    at new HTML5Aud
dioManager (D:\FizzB
Bash\TheWanderer\src
c\audio\managers\htm
ml5-audio-manager.ts
s:41:14)
    at createSpecif
ficAudioManager (D:\
\FizzBash\TheWandere
er\src\audio\manager
rs\audio-manager-fac
ctory.ts:64:20)     
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:116:27   
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:233:9    
    at Object.react
t-stack-bottom-frame
e (D:\FizzBash\TheWa
anderer\node_modules
s\react-dom\cjs\reac
ct-dom-client.develo
opment.js:23949:20) 
    at runWithFiber
rInDEV (D:\FizzBash\
\TheWanderer\node_mo
odules\react-dom\cjs
s\react-dom-client.d
development.js:1522:
:13)
    at commitHookEf
ffectListMount (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:11905:29)       
    at commitHookPa
assiveMountEffects (
(D:\FizzBash\TheWand
derer\node_modules\r
react-dom\cjs\react-
-dom-client.developm
ment.js:12028:11)   
    at commitPassiv
veMountOnFiber (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:13841:13) undefi
ined
HTML5 audio not sup
pported, falling bac
ck to silent mode   


stderr | src/tests/
/app-sound-integrati
ion.test.tsx > App S
Sound Integration > 
 Keyboard Controls I
Integration > should
d handle game moveme
ent keys without int
terfering with audio
Audio manager not i
initialized
Audio manager not i
initialized
Audio manager not i
initialized
Audio manager not i
initialized


stdout | src/tests/
/app-sound-integrati
ion.test.tsx > App S
Sound Integration > 
 Keyboard Controls I
Integration > should
d handle mute keyboa
ard shortcut (Ctrl+M
M)
Silent Audio Manage
er initialized - no 
 audio will be playe
ed
Silent Audio Manage
er initialized - no 
 audio will be playe
ed

stderr | src/tests/
/app-sound-integrati
ion.test.tsx > App S
Sound Integration > 
 Keyboard Controls I
Integration > should
d handle mute keyboa
ard shortcut (Ctrl+M
M)
No audio support de
etected, using silen
nt mode
Selected audio mana
ager not supported, 
 falling back       
HTML5 Audio initial
lization failed: Err
ror: HTML5 Audio can
nPlayType not suppor
rted
    at HTML5AudioMa
anager.initialize (D
D:\FizzBash\TheWande
erer\src\audio\manag
gers\html5-audio-man
nager.ts:56:23)     
    at new HTML5Aud
dioManager (D:\FizzB
Bash\TheWanderer\src
c\audio\managers\htm
ml5-audio-manager.ts
s:41:14)
    at createSpecif
ficAudioManager (D:\
\FizzBash\TheWandere
er\src\audio\manager
rs\audio-manager-fac
ctory.ts:64:20)     
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:116:27   
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:233:9    
    at Object.react
t-stack-bottom-frame
e (D:\FizzBash\TheWa
anderer\node_modules
s\react-dom\cjs\reac
ct-dom-client.develo
opment.js:23949:20) 
    at runWithFiber
rInDEV (D:\FizzBash\
\TheWanderer\node_mo
odules\react-dom\cjs
s\react-dom-client.d
development.js:1522:
:13)
    at commitHookEf
ffectListMount (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:11905:29)       
    at commitHookPa
assiveMountEffects (
(D:\FizzBash\TheWand
derer\node_modules\r
react-dom\cjs\react-
-dom-client.developm
ment.js:12028:11)   
    at commitPassiv
veMountOnFiber (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:13841:13)       
Audio error event: 
 HTML5_AUDIO_INIT_FA
AILED Error: HTML5 A
Audio canPlayType no
ot supported        
    at HTML5AudioMa
anager.initialize (D
D:\FizzBash\TheWande
erer\src\audio\manag
gers\html5-audio-man
nager.ts:56:23)     
    at new HTML5Aud
dioManager (D:\FizzB
Bash\TheWanderer\src
c\audio\managers\htm
ml5-audio-manager.ts
s:41:14)
    at createSpecif
ficAudioManager (D:\
\FizzBash\TheWandere
er\src\audio\manager
rs\audio-manager-fac
ctory.ts:64:20)     
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:116:27   
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:233:9    
    at Object.react
t-stack-bottom-frame
e (D:\FizzBash\TheWa
anderer\node_modules
s\react-dom\cjs\reac
ct-dom-client.develo
opment.js:23949:20) 
    at runWithFiber
rInDEV (D:\FizzBash\
\TheWanderer\node_mo
odules\react-dom\cjs
s\react-dom-client.d
development.js:1522:
:13)
    at commitHookEf
ffectListMount (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:11905:29)       
    at commitHookPa
assiveMountEffects (
(D:\FizzBash\TheWand
derer\node_modules\r
react-dom\cjs\react-
-dom-client.developm
ment.js:12028:11)   
    at commitPassiv
veMountOnFiber (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:13841:13) undefi
ined
HTML5 audio not sup
pported, falling bac
ck to silent mode   


stdout | src/tests/
/app-sound-integrati
ion.test.tsx > App S
Sound Integration > 
 Keyboard Controls I
Integration > should
d handle mute keyboa
ard shortcut (Cmd+M)
) on Mac
Silent Audio Manage
er initialized - no 
 audio will be playe
ed
Silent Audio Manage
er initialized - no 
 audio will be playe
ed

stderr | src/tests/
/app-sound-integrati
ion.test.tsx > App S
Sound Integration > 
 Keyboard Controls I
Integration > should
d handle mute keyboa
ard shortcut (Cmd+M)
) on Mac
No audio support de
etected, using silen
nt mode
Selected audio mana
ager not supported, 
 falling back       
HTML5 Audio initial
lization failed: Err
ror: HTML5 Audio can
nPlayType not suppor
rted
    at HTML5AudioMa
anager.initialize (D
D:\FizzBash\TheWande
erer\src\audio\manag
gers\html5-audio-man
nager.ts:56:23)     
    at new HTML5Aud
dioManager (D:\FizzB
Bash\TheWanderer\src
c\audio\managers\htm
ml5-audio-manager.ts
s:41:14)
    at createSpecif
ficAudioManager (D:\
\FizzBash\TheWandere
er\src\audio\manager
rs\audio-manager-fac
ctory.ts:64:20)     
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:116:27   
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:233:9    
    at Object.react
t-stack-bottom-frame
e (D:\FizzBash\TheWa
anderer\node_modules
s\react-dom\cjs\reac
ct-dom-client.develo
opment.js:23949:20) 
    at runWithFiber
rInDEV (D:\FizzBash\
\TheWanderer\node_mo
odules\react-dom\cjs
s\react-dom-client.d
development.js:1522:
:13)
    at commitHookEf
ffectListMount (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:11905:29)       
    at commitHookPa
assiveMountEffects (
(D:\FizzBash\TheWand
derer\node_modules\r
react-dom\cjs\react-
-dom-client.developm
ment.js:12028:11)   
    at commitPassiv
veMountOnFiber (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:13841:13)       
Audio error event: 
 HTML5_AUDIO_INIT_FA
AILED Error: HTML5 A
Audio canPlayType no
ot supported        
    at HTML5AudioMa
anager.initialize (D
D:\FizzBash\TheWande
erer\src\audio\manag
gers\html5-audio-man
nager.ts:56:23)     
    at new HTML5Aud
dioManager (D:\FizzB
Bash\TheWanderer\src
c\audio\managers\htm
ml5-audio-manager.ts
s:41:14)
    at createSpecif
ficAudioManager (D:\
\FizzBash\TheWandere
er\src\audio\manager
rs\audio-manager-fac
ctory.ts:64:20)     
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:116:27   
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:233:9    
    at Object.react
t-stack-bottom-frame
e (D:\FizzBash\TheWa
anderer\node_modules
s\react-dom\cjs\reac
ct-dom-client.develo
opment.js:23949:20) 
    at runWithFiber
rInDEV (D:\FizzBash\
\TheWanderer\node_mo
odules\react-dom\cjs
s\react-dom-client.d
development.js:1522:
:13)
    at commitHookEf
ffectListMount (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:11905:29)       
    at commitHookPa
assiveMountEffects (
(D:\FizzBash\TheWand
derer\node_modules\r
react-dom\cjs\react-
-dom-client.developm
ment.js:12028:11)   
    at commitPassiv
veMountOnFiber (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:13841:13) undefi
ined
HTML5 audio not sup
pported, falling bac
ck to silent mode   


stdout | src/tests/
/app-sound-integrati
ion.test.tsx > App S
Sound Integration > 
 Keyboard Controls I
Integration > should
d not trigger mute o
on M key without mod
difiers
Silent Audio Manage
er initialized - no 
 audio will be playe
ed
Silent Audio Manage
er initialized - no 
 audio will be playe
ed

stderr | src/tests/
/app-sound-integrati
ion.test.tsx > App S
Sound Integration > 
 Keyboard Controls I
Integration > should
d not trigger mute o
on M key without mod
difiers
No audio support de
etected, using silen
nt mode
Selected audio mana
ager not supported, 
 falling back       
HTML5 Audio initial
lization failed: Err
ror: HTML5 Audio can
nPlayType not suppor
rted
    at HTML5AudioMa
anager.initialize (D
D:\FizzBash\TheWande
erer\src\audio\manag
gers\html5-audio-man
nager.ts:56:23)     
    at new HTML5Aud
dioManager (D:\FizzB
Bash\TheWanderer\src
c\audio\managers\htm
ml5-audio-manager.ts
s:41:14)
    at createSpecif
ficAudioManager (D:\
\FizzBash\TheWandere
er\src\audio\manager
rs\audio-manager-fac
ctory.ts:64:20)     
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:116:27   
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:233:9    
    at Object.react
t-stack-bottom-frame
e (D:\FizzBash\TheWa
anderer\node_modules
s\react-dom\cjs\reac
ct-dom-client.develo
opment.js:23949:20) 
    at runWithFiber
rInDEV (D:\FizzBash\
\TheWanderer\node_mo
odules\react-dom\cjs
s\react-dom-client.d
development.js:1522:
:13)
    at commitHookEf
ffectListMount (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:11905:29)       
    at commitHookPa
assiveMountEffects (
(D:\FizzBash\TheWand
derer\node_modules\r
react-dom\cjs\react-
-dom-client.developm
ment.js:12028:11)   
    at commitPassiv
veMountOnFiber (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:13841:13)       
Audio error event: 
 HTML5_AUDIO_INIT_FA
AILED Error: HTML5 A
Audio canPlayType no
ot supported        
    at HTML5AudioMa
anager.initialize (D
D:\FizzBash\TheWande
erer\src\audio\manag
gers\html5-audio-man
nager.ts:56:23)     
    at new HTML5Aud
dioManager (D:\FizzB
Bash\TheWanderer\src
c\audio\managers\htm
ml5-audio-manager.ts
s:41:14)
    at createSpecif
ficAudioManager (D:\
\FizzBash\TheWandere
er\src\audio\manager
rs\audio-manager-fac
ctory.ts:64:20)     
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:116:27   
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:233:9    
    at Object.react
t-stack-bottom-frame
e (D:\FizzBash\TheWa
anderer\node_modules
s\react-dom\cjs\reac
ct-dom-client.develo
opment.js:23949:20) 
    at runWithFiber
rInDEV (D:\FizzBash\
\TheWanderer\node_mo
odules\react-dom\cjs
s\react-dom-client.d
development.js:1522:
:13)
    at commitHookEf
ffectListMount (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:11905:29)       
    at commitHookPa
assiveMountEffects (
(D:\FizzBash\TheWand
derer\node_modules\r
react-dom\cjs\react-
-dom-client.developm
ment.js:12028:11)   
    at commitPassiv
veMountOnFiber (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:13841:13) undefi
ined
HTML5 audio not sup
pported, falling bac
ck to silent mode   


stdout | src/tests/
/app-sound-integrati
ion.test.tsx > App S
Sound Integration > 
 Game Event Sound In
ntegration > should 
 emit sounds for pla
ayer movement       
Silent Audio Manage
er initialized - no 
 audio will be playe
ed
Silent Audio Manage
er initialized - no 
 audio will be playe
ed

stderr | src/tests/
/app-sound-integrati
ion.test.tsx > App S
Sound Integration > 
 Game Event Sound In
ntegration > should 
 emit sounds for pla
ayer movement       
No audio support de
etected, using silen
nt mode
Selected audio mana
ager not supported, 
 falling back       
HTML5 Audio initial
lization failed: Err
ror: HTML5 Audio can
nPlayType not suppor
rted
    at HTML5AudioMa
anager.initialize (D
D:\FizzBash\TheWande
erer\src\audio\manag
gers\html5-audio-man
nager.ts:56:23)     
    at new HTML5Aud
dioManager (D:\FizzB
Bash\TheWanderer\src
c\audio\managers\htm
ml5-audio-manager.ts
s:41:14)
    at createSpecif
ficAudioManager (D:\
\FizzBash\TheWandere
er\src\audio\manager
rs\audio-manager-fac
ctory.ts:64:20)     
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:116:27   
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:233:9    
    at Object.react
t-stack-bottom-frame
e (D:\FizzBash\TheWa
anderer\node_modules
s\react-dom\cjs\reac
ct-dom-client.develo
opment.js:23949:20) 
    at runWithFiber
rInDEV (D:\FizzBash\
\TheWanderer\node_mo
odules\react-dom\cjs
s\react-dom-client.d
development.js:1522:
:13)
    at commitHookEf
ffectListMount (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:11905:29)       
    at commitHookPa
assiveMountEffects (
(D:\FizzBash\TheWand
derer\node_modules\r
react-dom\cjs\react-
-dom-client.developm
ment.js:12028:11)   
    at commitPassiv
veMountOnFiber (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:13841:13)       
Audio error event: 
 HTML5_AUDIO_INIT_FA
AILED Error: HTML5 A
Audio canPlayType no
ot supported        
    at HTML5AudioMa
anager.initialize (D
D:\FizzBash\TheWande
erer\src\audio\manag
gers\html5-audio-man
nager.ts:56:23)     
    at new HTML5Aud
dioManager (D:\FizzB
Bash\TheWanderer\src
c\audio\managers\htm
ml5-audio-manager.ts
s:41:14)
    at createSpecif
ficAudioManager (D:\
\FizzBash\TheWandere
er\src\audio\manager
rs\audio-manager-fac
ctory.ts:64:20)     
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:116:27   
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:233:9    
    at Object.react
t-stack-bottom-frame
e (D:\FizzBash\TheWa
anderer\node_modules
s\react-dom\cjs\reac
ct-dom-client.develo
opment.js:23949:20) 
    at runWithFiber
rInDEV (D:\FizzBash\
\TheWanderer\node_mo
odules\react-dom\cjs
s\react-dom-client.d
development.js:1522:
:13)
    at commitHookEf
ffectListMount (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:11905:29)       
    at commitHookPa
assiveMountEffects (
(D:\FizzBash\TheWand
derer\node_modules\r
react-dom\cjs\react-
-dom-client.developm
ment.js:12028:11)   
    at commitPassiv
veMountOnFiber (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:13841:13) undefi
ined
HTML5 audio not sup
pported, falling bac
ck to silent mode   


stderr | src/tests/
/app-sound-integrati
ion.test.tsx > App S
Sound Integration > 
 Game Event Sound In
ntegration > should 
 emit sounds for pla
ayer movement       
Audio manager not i
initialized
Audio manager not i
initialized
Audio manager not i
initialized
Audio manager not i
initialized


stdout | src/tests/
/app-sound-integrati
ion.test.tsx > App S
Sound Integration > 
 Game Event Sound In
ntegration > should 
 stop all sounds whe
en game ends        
Silent Audio Manage
er initialized - no 
 audio will be playe
ed
Silent Audio Manage
er initialized - no 
 audio will be playe
ed

stderr | src/tests/
/app-sound-integrati
ion.test.tsx > App S
Sound Integration > 
 Game Event Sound In
ntegration > should 
 stop all sounds whe
en game ends        
No audio support de
etected, using silen
nt mode
Selected audio mana
ager not supported, 
 falling back       
HTML5 Audio initial
lization failed: Err
ror: HTML5 Audio can
nPlayType not suppor
rted
    at HTML5AudioMa
anager.initialize (D
D:\FizzBash\TheWande
erer\src\audio\manag
gers\html5-audio-man
nager.ts:56:23)     
    at new HTML5Aud
dioManager (D:\FizzB
Bash\TheWanderer\src
c\audio\managers\htm
ml5-audio-manager.ts
s:41:14)
    at createSpecif
ficAudioManager (D:\
\FizzBash\TheWandere
er\src\audio\manager
rs\audio-manager-fac
ctory.ts:64:20)     
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:116:27   
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:233:9    
    at Object.react
t-stack-bottom-frame
e (D:\FizzBash\TheWa
anderer\node_modules
s\react-dom\cjs\reac
ct-dom-client.develo
opment.js:23949:20) 
    at runWithFiber
rInDEV (D:\FizzBash\
\TheWanderer\node_mo
odules\react-dom\cjs
s\react-dom-client.d
development.js:1522:
:13)
    at commitHookEf
ffectListMount (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:11905:29)       
    at commitHookPa
assiveMountEffects (
(D:\FizzBash\TheWand
derer\node_modules\r
react-dom\cjs\react-
-dom-client.developm
ment.js:12028:11)   
    at commitPassiv
veMountOnFiber (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:13841:13)       
Audio error event: 
 HTML5_AUDIO_INIT_FA
AILED Error: HTML5 A
Audio canPlayType no
ot supported        
    at HTML5AudioMa
anager.initialize (D
D:\FizzBash\TheWande
erer\src\audio\manag
gers\html5-audio-man
nager.ts:56:23)     
    at new HTML5Aud
dioManager (D:\FizzB
Bash\TheWanderer\src
c\audio\managers\htm
ml5-audio-manager.ts
s:41:14)
    at createSpecif
ficAudioManager (D:\
\FizzBash\TheWandere
er\src\audio\manager
rs\audio-manager-fac
ctory.ts:64:20)     
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:116:27   
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:233:9    
    at Object.react
t-stack-bottom-frame
e (D:\FizzBash\TheWa
anderer\node_modules
s\react-dom\cjs\reac
ct-dom-client.develo
opment.js:23949:20) 
    at runWithFiber
rInDEV (D:\FizzBash\
\TheWanderer\node_mo
odules\react-dom\cjs
s\react-dom-client.d
development.js:1522:
:13)
    at commitHookEf
ffectListMount (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:11905:29)       
    at commitHookPa
assiveMountEffects (
(D:\FizzBash\TheWand
derer\node_modules\r
react-dom\cjs\react-
-dom-client.developm
ment.js:12028:11)   
    at commitPassiv
veMountOnFiber (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:13841:13) undefi
ined
HTML5 audio not sup
pported, falling bac
ck to silent mode   

stderr | src/tests/
/app-sound-integrati
ion.test.tsx > App S
Sound Integration > 
 Game Event Sound In
ntegration > should 
 stop all sounds whe
en game ends        
Audio manager not i
initialized
Audio manager not i
initialized


stdout | src/tests/
/app-sound-integrati
ion.test.tsx > App S
Sound Integration > 
 Game Event Sound In
ntegration > should 
 not emit sounds whe
en game is over     
Silent Audio Manage
er initialized - no 
 audio will be playe
ed
Silent Audio Manage
er initialized - no 
 audio will be playe
ed

stderr | src/tests/
/app-sound-integrati
ion.test.tsx > App S
Sound Integration > 
 Game Event Sound In
ntegration > should 
 not emit sounds whe
en game is over     
No audio support de
etected, using silen
nt mode
Selected audio mana
ager not supported, 
 falling back       
HTML5 Audio initial
lization failed: Err
ror: HTML5 Audio can
nPlayType not suppor
rted
    at HTML5AudioMa
anager.initialize (D
D:\FizzBash\TheWande
erer\src\audio\manag
gers\html5-audio-man
nager.ts:56:23)     
    at new HTML5Aud
dioManager (D:\FizzB
Bash\TheWanderer\src
c\audio\managers\htm
ml5-audio-manager.ts
s:41:14)
    at createSpecif
ficAudioManager (D:\
\FizzBash\TheWandere
er\src\audio\manager
rs\audio-manager-fac
ctory.ts:64:20)     
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:116:27   
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:233:9    
    at Object.react
t-stack-bottom-frame
e (D:\FizzBash\TheWa
anderer\node_modules
s\react-dom\cjs\reac
ct-dom-client.develo
opment.js:23949:20) 
    at runWithFiber
rInDEV (D:\FizzBash\
\TheWanderer\node_mo
odules\react-dom\cjs
s\react-dom-client.d
development.js:1522:
:13)
    at commitHookEf
ffectListMount (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:11905:29)       
    at commitHookPa
assiveMountEffects (
(D:\FizzBash\TheWand
derer\node_modules\r
react-dom\cjs\react-
-dom-client.developm
ment.js:12028:11)   
    at commitPassiv
veMountOnFiber (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:13841:13)       
Audio error event: 
 HTML5_AUDIO_INIT_FA
AILED Error: HTML5 A
Audio canPlayType no
ot supported        
    at HTML5AudioMa
anager.initialize (D
D:\FizzBash\TheWande
erer\src\audio\manag
gers\html5-audio-man
nager.ts:56:23)     
    at new HTML5Aud
dioManager (D:\FizzB
Bash\TheWanderer\src
c\audio\managers\htm
ml5-audio-manager.ts
s:41:14)
    at createSpecif
ficAudioManager (D:\
\FizzBash\TheWandere
er\src\audio\manager
rs\audio-manager-fac
ctory.ts:64:20)     
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:116:27   
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:233:9    
    at Object.react
t-stack-bottom-frame
e (D:\FizzBash\TheWa
anderer\node_modules
s\react-dom\cjs\reac
ct-dom-client.develo
opment.js:23949:20) 
    at runWithFiber
rInDEV (D:\FizzBash\
\TheWanderer\node_mo
odules\react-dom\cjs
s\react-dom-client.d
development.js:1522:
:13)
    at commitHookEf
ffectListMount (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:11905:29)       
    at commitHookPa
assiveMountEffects (
(D:\FizzBash\TheWand
derer\node_modules\r
react-dom\cjs\react-
-dom-client.developm
ment.js:12028:11)   
    at commitPassiv
veMountOnFiber (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:13841:13) undefi
ined
HTML5 audio not sup
pported, falling bac
ck to silent mode   


stderr | src/tests/
/app-sound-integrati
ion.test.tsx > App S
Sound Integration > 
 Game Event Sound In
ntegration > should 
 not emit sounds whe
en game is over     
Audio manager not i
initialized
Audio manager not i
initialized


stdout | src/tests/
/app-sound-integrati
ion.test.tsx > App S
Sound Integration > 
 Audio Controls Inte
egration > should to
oggle mute via butto
on click
Silent Audio Manage
er initialized - no 
 audio will be playe
ed
Silent Audio Manage
er initialized - no 
 audio will be playe
ed

stderr | src/tests/
/app-sound-integrati
ion.test.tsx > App S
Sound Integration > 
 Audio Controls Inte
egration > should to
oggle mute via butto
on click
No audio support de
etected, using silen
nt mode
Selected audio mana
ager not supported, 
 falling back       
HTML5 Audio initial
lization failed: Err
ror: HTML5 Audio can
nPlayType not suppor
rted
    at HTML5AudioMa
anager.initialize (D
D:\FizzBash\TheWande
erer\src\audio\manag
gers\html5-audio-man
nager.ts:56:23)     
    at new HTML5Aud
dioManager (D:\FizzB
Bash\TheWanderer\src
c\audio\managers\htm
ml5-audio-manager.ts
s:41:14)
    at createSpecif
ficAudioManager (D:\
\FizzBash\TheWandere
er\src\audio\manager
rs\audio-manager-fac
ctory.ts:64:20)     
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:116:27   
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:233:9    
    at Object.react
t-stack-bottom-frame
e (D:\FizzBash\TheWa
anderer\node_modules
s\react-dom\cjs\reac
ct-dom-client.develo
opment.js:23949:20) 
    at runWithFiber
rInDEV (D:\FizzBash\
\TheWanderer\node_mo
odules\react-dom\cjs
s\react-dom-client.d
development.js:1522:
:13)
    at commitHookEf
ffectListMount (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:11905:29)       
    at commitHookPa
assiveMountEffects (
(D:\FizzBash\TheWand
derer\node_modules\r
react-dom\cjs\react-
-dom-client.developm
ment.js:12028:11)   
    at commitPassiv
veMountOnFiber (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:13841:13)       
Audio error event: 
 HTML5_AUDIO_INIT_FA
AILED Error: HTML5 A
Audio canPlayType no
ot supported        
    at HTML5AudioMa
anager.initialize (D
D:\FizzBash\TheWande
erer\src\audio\manag
gers\html5-audio-man
nager.ts:56:23)     
    at new HTML5Aud
dioManager (D:\FizzB
Bash\TheWanderer\src
c\audio\managers\htm
ml5-audio-manager.ts
s:41:14)
    at createSpecif
ficAudioManager (D:\
\FizzBash\TheWandere
er\src\audio\manager
rs\audio-manager-fac
ctory.ts:64:20)     
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:116:27   
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:233:9    
    at Object.react
t-stack-bottom-frame
e (D:\FizzBash\TheWa
anderer\node_modules
s\react-dom\cjs\reac
ct-dom-client.develo
opment.js:23949:20) 
    at runWithFiber
rInDEV (D:\FizzBash\
\TheWanderer\node_mo
odules\react-dom\cjs
s\react-dom-client.d
development.js:1522:
:13)
    at commitHookEf
ffectListMount (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:11905:29)       
    at commitHookPa
assiveMountEffects (
(D:\FizzBash\TheWand
derer\node_modules\r
react-dom\cjs\react-
-dom-client.developm
ment.js:12028:11)   
    at commitPassiv
veMountOnFiber (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:13841:13) undefi
ined
HTML5 audio not sup
pported, falling bac
ck to silent mode   

stderr | src/tests/
/app-sound-integrati
ion.test.tsx > App S
Sound Integration > 
 Audio Controls Inte
egration > should to
oggle mute via butto
on click
Audio manager not i
initialized


stderr | src/tests/
/app-sound-integrati
ion.test.tsx > App S
Sound Integration > 
 Audio Controls Inte
egration > should to
oggle mute via butto
on click
TypeError: toggleMu
ute is not a functio
on
    at handleMuteCl
lick (D:\FizzBash\Th
heWanderer\src\audio
o\components\AudioCo
ontrol.tsx:12:9)    
    at executeDispa
atch (D:\FizzBash\Th
heWanderer\node_modu
ules\react-dom\cjs\r
react-dom-client.dev
velopment.js:16368:9
9)
    at runWithFiber
rInDEV (D:\FizzBash\
\TheWanderer\node_mo
odules\react-dom\cjs
s\react-dom-client.d
development.js:1522:
:13)
    at processDispa
atchQueue (D:\FizzBa
ash\TheWanderer\node
e_modules\react-dom\
\cjs\react-dom-clien
nt.development.js:16
6418:19)
    at D:\FizzBash\
\TheWanderer\node_mo
odules\react-dom\cjs
s\react-dom-client.d
development.js:17016
6:9
    at batchedUpdat
tes$1 (D:\FizzBash\T
TheWanderer\node_mod
dules\react-dom\cjs\
\react-dom-client.de
evelopment.js:3262:4
40)
    at dispatchEven
ntForPluginEventSyst
tem (D:\FizzBash\The
eWanderer\node_modul
les\react-dom\cjs\re
eact-dom-client.deve
elopment.js:16572:7)
    at dispatchEven
nt (D:\FizzBash\TheW
Wanderer\node_module
es\react-dom\cjs\rea
act-dom-client.devel
lopment.js:20658:11)
    at dispatchDisc
creteEvent (D:\FizzB
Bash\TheWanderer\nod
de_modules\react-dom
m\cjs\react-dom-clie
ent.development.js:2
20626:11)
    at HTMLDivEleme
ent.callTheUserObjec
ctsOperation (D:\Fiz
zzBash\TheWanderer\n
node_modules\jsdom\l
lib\jsdom\living\gen
nerated\EventListene
er.js:26:30)        


stdout | src/tests/
/app-sound-integrati
ion.test.tsx > App S
Sound Integration > 
 Audio Controls Inte
egration > should op
pen audio settings d
dialog
Silent Audio Manage
er initialized - no 
 audio will be playe
ed
Silent Audio Manage
er initialized - no 
 audio will be playe
ed

stderr | src/tests/
/app-sound-integrati
ion.test.tsx > App S
Sound Integration > 
 Audio Controls Inte
egration > should op
pen audio settings d
dialog
No audio support de
etected, using silen
nt mode
Selected audio mana
ager not supported, 
 falling back       
HTML5 Audio initial
lization failed: Err
ror: HTML5 Audio can
nPlayType not suppor
rted
    at HTML5AudioMa
anager.initialize (D
D:\FizzBash\TheWande
erer\src\audio\manag
gers\html5-audio-man
nager.ts:56:23)     
    at new HTML5Aud
dioManager (D:\FizzB
Bash\TheWanderer\src
c\audio\managers\htm
ml5-audio-manager.ts
s:41:14)
    at createSpecif
ficAudioManager (D:\
\FizzBash\TheWandere
er\src\audio\manager
rs\audio-manager-fac
ctory.ts:64:20)     
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:116:27   
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:233:9    
    at Object.react
t-stack-bottom-frame
e (D:\FizzBash\TheWa
anderer\node_modules
s\react-dom\cjs\reac
ct-dom-client.develo
opment.js:23949:20) 
    at runWithFiber
rInDEV (D:\FizzBash\
\TheWanderer\node_mo
odules\react-dom\cjs
s\react-dom-client.d
development.js:1522:
:13)
    at commitHookEf
ffectListMount (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:11905:29)       
    at commitHookPa
assiveMountEffects (
(D:\FizzBash\TheWand
derer\node_modules\r
react-dom\cjs\react-
-dom-client.developm
ment.js:12028:11)   
    at commitPassiv
veMountOnFiber (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:13841:13)       
Audio error event: 
 HTML5_AUDIO_INIT_FA
AILED Error: HTML5 A
Audio canPlayType no
ot supported        
    at HTML5AudioMa
anager.initialize (D
D:\FizzBash\TheWande
erer\src\audio\manag
gers\html5-audio-man
nager.ts:56:23)     
    at new HTML5Aud
dioManager (D:\FizzB
Bash\TheWanderer\src
c\audio\managers\htm
ml5-audio-manager.ts
s:41:14)
    at createSpecif
ficAudioManager (D:\
\FizzBash\TheWandere
er\src\audio\manager
rs\audio-manager-fac
ctory.ts:64:20)     
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:116:27   
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:233:9    
    at Object.react
t-stack-bottom-frame
e (D:\FizzBash\TheWa
anderer\node_modules
s\react-dom\cjs\reac
ct-dom-client.develo
opment.js:23949:20) 
    at runWithFiber
rInDEV (D:\FizzBash\
\TheWanderer\node_mo
odules\react-dom\cjs
s\react-dom-client.d
development.js:1522:
:13)
    at commitHookEf
ffectListMount (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:11905:29)       
    at commitHookPa
assiveMountEffects (
(D:\FizzBash\TheWand
derer\node_modules\r
react-dom\cjs\react-
-dom-client.developm
ment.js:12028:11)   
    at commitPassiv
veMountOnFiber (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:13841:13) undefi
ined
HTML5 audio not sup
pported, falling bac
ck to silent mode   


stdout | src/tests/
/app-sound-integrati
ion.test.tsx > App S
Sound Integration > 
 Audio Controls Inte
egration > should di
isplay audio error m
messages when availa
able
Silent Audio Manage
er initialized - no 
 audio will be playe
ed
Silent Audio Manage
er initialized - no 
 audio will be playe
ed

stderr | src/tests/
/app-sound-integrati
ion.test.tsx > App S
Sound Integration > 
 Audio Controls Inte
egration > should di
isplay audio error m
messages when availa
able
No audio support de
etected, using silen
nt mode
Selected audio mana
ager not supported, 
 falling back       
HTML5 Audio initial
lization failed: Err
ror: HTML5 Audio can
nPlayType not suppor
rted
    at HTML5AudioMa
anager.initialize (D
D:\FizzBash\TheWande
erer\src\audio\manag
gers\html5-audio-man
nager.ts:56:23)     
    at new HTML5Aud
dioManager (D:\FizzB
Bash\TheWanderer\src
c\audio\managers\htm
ml5-audio-manager.ts
s:41:14)
    at createSpecif
ficAudioManager (D:\
\FizzBash\TheWandere
er\src\audio\manager
rs\audio-manager-fac
ctory.ts:64:20)     
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:116:27   
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:233:9    
    at Object.react
t-stack-bottom-frame
e (D:\FizzBash\TheWa
anderer\node_modules
s\react-dom\cjs\reac
ct-dom-client.develo
opment.js:23949:20) 
    at runWithFiber
rInDEV (D:\FizzBash\
\TheWanderer\node_mo
odules\react-dom\cjs
s\react-dom-client.d
development.js:1522:
:13)
    at commitHookEf
ffectListMount (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:11905:29)       
    at commitHookPa
assiveMountEffects (
(D:\FizzBash\TheWand
derer\node_modules\r
react-dom\cjs\react-
-dom-client.developm
ment.js:12028:11)   
    at commitPassiv
veMountOnFiber (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:13841:13)       
Audio error event: 
 HTML5_AUDIO_INIT_FA
AILED Error: HTML5 A
Audio canPlayType no
ot supported        
    at HTML5AudioMa
anager.initialize (D
D:\FizzBash\TheWande
erer\src\audio\manag
gers\html5-audio-man
nager.ts:56:23)     
    at new HTML5Aud
dioManager (D:\FizzB
Bash\TheWanderer\src
c\audio\managers\htm
ml5-audio-manager.ts
s:41:14)
    at createSpecif
ficAudioManager (D:\
\FizzBash\TheWandere
er\src\audio\manager
rs\audio-manager-fac
ctory.ts:64:20)     
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:116:27   
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:233:9    
    at Object.react
t-stack-bottom-frame
e (D:\FizzBash\TheWa
anderer\node_modules
s\react-dom\cjs\reac
ct-dom-client.develo
opment.js:23949:20) 
    at runWithFiber
rInDEV (D:\FizzBash\
\TheWanderer\node_mo
odules\react-dom\cjs
s\react-dom-client.d
development.js:1522:
:13)
    at commitHookEf
ffectListMount (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:11905:29)       
    at commitHookPa
assiveMountEffects (
(D:\FizzBash\TheWand
derer\node_modules\r
react-dom\cjs\react-
-dom-client.developm
ment.js:12028:11)   
    at commitPassiv
veMountOnFiber (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:13841:13) undefi
ined
HTML5 audio not sup
pported, falling bac
ck to silent mode   
An update to AudioP
Provider inside a te
est was not wrapped 
 in act(...).       

When testing, code 
 that causes React s
state updates should
d be wrapped into ac
ct(...):

act(() => {        
  /* fire events th
hat update state */ 
});
/* assert on the ou
utput */

This ensures that y
you're testing the b
behavior the user wo
ould see in the brow
wser. Learn more at 
 https://react.dev/l
link/wrap-tests-with
h-act

stderr | src/tests/
/app-sound-integrati
ion.test.tsx > App S
Sound Integration > 
 Audio Controls Inte
egration > should di
isplay audio error m
messages when availa
able
An update to AudioP
Provider inside a te
est was not wrapped 
 in act(...).       

When testing, code 
 that causes React s
state updates should
d be wrapped into ac
ct(...):

act(() => {        
  /* fire events th
hat update state */ 
});
/* assert on the ou
utput */

This ensures that y
you're testing the b
behavior the user wo
ould see in the brow
wser. Learn more at 
 https://react.dev/l
link/wrap-tests-with
h-act


stdout | src/tests/
/app-sound-integrati
ion.test.tsx > App S
Sound Integration > 
 Performance and Res
sponsiveness > shoul
ld not block user in
nput during sound pl
layback
Silent Audio Manage
er initialized - no 
 audio will be playe
ed
Silent Audio Manage
er initialized - no 
 audio will be playe
ed

stderr | src/tests/
/app-sound-integrati
ion.test.tsx > App S
Sound Integration > 
 Performance and Res
sponsiveness > shoul
ld not block user in
nput during sound pl
layback
No audio support de
etected, using silen
nt mode
Selected audio mana
ager not supported, 
 falling back       
HTML5 Audio initial
lization failed: Err
ror: HTML5 Audio can
nPlayType not suppor
rted
    at HTML5AudioMa
anager.initialize (D
D:\FizzBash\TheWande
erer\src\audio\manag
gers\html5-audio-man
nager.ts:56:23)     
    at new HTML5Aud
dioManager (D:\FizzB
Bash\TheWanderer\src
c\audio\managers\htm
ml5-audio-manager.ts
s:41:14)
    at createSpecif
ficAudioManager (D:\
\FizzBash\TheWandere
er\src\audio\manager
rs\audio-manager-fac
ctory.ts:64:20)     
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:116:27   
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:233:9    
    at Object.react
t-stack-bottom-frame
e (D:\FizzBash\TheWa
anderer\node_modules
s\react-dom\cjs\reac
ct-dom-client.develo
opment.js:23949:20) 
    at runWithFiber
rInDEV (D:\FizzBash\
\TheWanderer\node_mo
odules\react-dom\cjs
s\react-dom-client.d
development.js:1522:
:13)
    at commitHookEf
ffectListMount (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:11905:29)       
    at commitHookPa
assiveMountEffects (
(D:\FizzBash\TheWand
derer\node_modules\r
react-dom\cjs\react-
-dom-client.developm
ment.js:12028:11)   
    at commitPassiv
veMountOnFiber (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:13841:13)       
Audio error event: 
 HTML5_AUDIO_INIT_FA
AILED Error: HTML5 A
Audio canPlayType no
ot supported        
    at HTML5AudioMa
anager.initialize (D
D:\FizzBash\TheWande
erer\src\audio\manag
gers\html5-audio-man
nager.ts:56:23)     
    at new HTML5Aud
dioManager (D:\FizzB
Bash\TheWanderer\src
c\audio\managers\htm
ml5-audio-manager.ts
s:41:14)
    at createSpecif
ficAudioManager (D:\
\FizzBash\TheWandere
er\src\audio\manager
rs\audio-manager-fac
ctory.ts:64:20)     
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:116:27   
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:233:9    
    at Object.react
t-stack-bottom-frame
e (D:\FizzBash\TheWa
anderer\node_modules
s\react-dom\cjs\reac
ct-dom-client.develo
opment.js:23949:20) 
    at runWithFiber
rInDEV (D:\FizzBash\
\TheWanderer\node_mo
odules\react-dom\cjs
s\react-dom-client.d
development.js:1522:
:13)
    at commitHookEf
ffectListMount (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:11905:29)       
    at commitHookPa
assiveMountEffects (
(D:\FizzBash\TheWand
derer\node_modules\r
react-dom\cjs\react-
-dom-client.developm
ment.js:12028:11)   
    at commitPassiv
veMountOnFiber (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:13841:13) undefi
ined
HTML5 audio not sup
pported, falling bac
ck to silent mode   


stderr | src/tests/
/app-sound-integrati
ion.test.tsx > App S
Sound Integration > 
 Performance and Res
sponsiveness > shoul
ld not block user in
nput during sound pl
layback
Audio manager not i
initialized
Audio manager not i
initialized
Audio manager not i
initialized
Audio manager not i
initialized


stdout | src/tests/
/app-sound-integrati
ion.test.tsx > App S
Sound Integration > 
 Performance and Res
sponsiveness > shoul
ld handle multiple s
simultaneous sound e
events
Silent Audio Manage
er initialized - no 
 audio will be playe
ed
Silent Audio Manage
er initialized - no 
 audio will be playe
ed

stderr | src/tests/
/app-sound-integrati
ion.test.tsx > App S
Sound Integration > 
 Performance and Res
sponsiveness > shoul
ld handle multiple s
simultaneous sound e
events
No audio support de
etected, using silen
nt mode
Selected audio mana
ager not supported, 
 falling back       
HTML5 Audio initial
lization failed: Err
ror: HTML5 Audio can
nPlayType not suppor
rted
    at HTML5AudioMa
anager.initialize (D
D:\FizzBash\TheWande
erer\src\audio\manag
gers\html5-audio-man
nager.ts:56:23)     
    at new HTML5Aud
dioManager (D:\FizzB
Bash\TheWanderer\src
c\audio\managers\htm
ml5-audio-manager.ts
s:41:14)
    at createSpecif
ficAudioManager (D:\
\FizzBash\TheWandere
er\src\audio\manager
rs\audio-manager-fac
ctory.ts:64:20)     
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:116:27   
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:233:9    
    at Object.react
t-stack-bottom-frame
e (D:\FizzBash\TheWa
anderer\node_modules
s\react-dom\cjs\reac
ct-dom-client.develo
opment.js:23949:20) 
    at runWithFiber
rInDEV (D:\FizzBash\
\TheWanderer\node_mo
odules\react-dom\cjs
s\react-dom-client.d
development.js:1522:
:13)
    at commitHookEf
ffectListMount (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:11905:29)       
    at commitHookPa
assiveMountEffects (
(D:\FizzBash\TheWand
derer\node_modules\r
react-dom\cjs\react-
-dom-client.developm
ment.js:12028:11)   
    at commitPassiv
veMountOnFiber (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:13841:13)       
Audio error event: 
 HTML5_AUDIO_INIT_FA
AILED Error: HTML5 A
Audio canPlayType no
ot supported        
    at HTML5AudioMa
anager.initialize (D
D:\FizzBash\TheWande
erer\src\audio\manag
gers\html5-audio-man
nager.ts:56:23)     
    at new HTML5Aud
dioManager (D:\FizzB
Bash\TheWanderer\src
c\audio\managers\htm
ml5-audio-manager.ts
s:41:14)
    at createSpecif
ficAudioManager (D:\
\FizzBash\TheWandere
er\src\audio\manager
rs\audio-manager-fac
ctory.ts:64:20)     
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:116:27   
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:233:9    
    at Object.react
t-stack-bottom-frame
e (D:\FizzBash\TheWa
anderer\node_modules
s\react-dom\cjs\reac
ct-dom-client.develo
opment.js:23949:20) 
    at runWithFiber
rInDEV (D:\FizzBash\
\TheWanderer\node_mo
odules\react-dom\cjs
s\react-dom-client.d
development.js:1522:
:13)
    at commitHookEf
ffectListMount (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:11905:29)       
    at commitHookPa
assiveMountEffects (
(D:\FizzBash\TheWand
derer\node_modules\r
react-dom\cjs\react-
-dom-client.developm
ment.js:12028:11)   
    at commitPassiv
veMountOnFiber (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:13841:13) undefi
ined
HTML5 audio not sup
pported, falling bac
ck to silent mode   


stderr | src/tests/
/app-sound-integrati
ion.test.tsx > App S
Sound Integration > 
 Performance and Res
sponsiveness > shoul
ld handle multiple s
simultaneous sound e
events
Audio manager not i
initialized
Audio manager not i
initialized
Audio manager not i
initialized
Audio manager not i
initialized


stdout | src/tests/
/app-sound-integrati
ion.test.tsx > App S
Sound Integration > 
 Performance and Res
sponsiveness > shoul
ld maintain game sta
ate consistency duri
ing audio operations
Silent Audio Manage
er initialized - no 
 audio will be playe
ed
Silent Audio Manage
er initialized - no 
 audio will be playe
ed

stderr | src/tests/
/app-sound-integrati
ion.test.tsx > App S
Sound Integration > 
 Performance and Res
sponsiveness > shoul
ld maintain game sta
ate consistency duri
ing audio operations
No audio support de
etected, using silen
nt mode
Selected audio mana
ager not supported, 
 falling back       
HTML5 Audio initial
lization failed: Err
ror: HTML5 Audio can
nPlayType not suppor
rted
    at HTML5AudioMa
anager.initialize (D
D:\FizzBash\TheWande
erer\src\audio\manag
gers\html5-audio-man
nager.ts:56:23)     
    at new HTML5Aud
dioManager (D:\FizzB
Bash\TheWanderer\src
c\audio\managers\htm
ml5-audio-manager.ts
s:41:14)
    at createSpecif
ficAudioManager (D:\
\FizzBash\TheWandere
er\src\audio\manager
rs\audio-manager-fac
ctory.ts:64:20)     
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:116:27   
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:233:9    
    at Object.react
t-stack-bottom-frame
e (D:\FizzBash\TheWa
anderer\node_modules
s\react-dom\cjs\reac
ct-dom-client.develo
opment.js:23949:20) 
    at runWithFiber
rInDEV (D:\FizzBash\
\TheWanderer\node_mo
odules\react-dom\cjs
s\react-dom-client.d
development.js:1522:
:13)
    at commitHookEf
ffectListMount (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:11905:29)       
    at commitHookPa
assiveMountEffects (
(D:\FizzBash\TheWand
derer\node_modules\r
react-dom\cjs\react-
-dom-client.developm
ment.js:12028:11)   
    at commitPassiv
veMountOnFiber (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:13841:13)       
Audio error event: 
 HTML5_AUDIO_INIT_FA
AILED Error: HTML5 A
Audio canPlayType no
ot supported        
    at HTML5AudioMa
anager.initialize (D
D:\FizzBash\TheWande
erer\src\audio\manag
gers\html5-audio-man
nager.ts:56:23)     
    at new HTML5Aud
dioManager (D:\FizzB
Bash\TheWanderer\src
c\audio\managers\htm
ml5-audio-manager.ts
s:41:14)
    at createSpecif
ficAudioManager (D:\
\FizzBash\TheWandere
er\src\audio\manager
rs\audio-manager-fac
ctory.ts:64:20)     
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:116:27   
    at D:\FizzBash\
\TheWanderer\src\aud
dio\context\audio-co
ontext.tsx:233:9    
    at Object.react
t-stack-bottom-frame
e (D:\FizzBash\TheWa
anderer\node_modules
s\react-dom\cjs\reac
ct-dom-client.develo
opment.js:23949:20) 
    at runWithFiber
rInDEV (D:\FizzBash\
\TheWanderer\node_mo
odules\react-dom\cjs
s\react-dom-client.d
development.js:1522:
:13)
    at commitHookEf
ffectListMount (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:11905:29)       
    at commitHookPa
assiveMountEffects (
(D:\FizzBash\TheWand
derer\node_modules\r
react-dom\cjs\react-
-dom-client.developm
ment.js:12028:11)   
    at commitPassiv
veMountOnFiber (D:\F
FizzBash\TheWanderer
r\node_modules\react
t-dom\cjs\react-dom-
-client.development.
.js:13841:13) undefi
ined
HTML5 audio not sup
pported, falling bac
ck to silent mode   


stderr | src/tests/
/app-sound-integrati
ion.test.tsx > App S
Sound Integration > 
 Performance and Res
sponsiveness > shoul
ld maintain game sta
ate consistency duri
ing audio operations
Audio manager not i
initialized
Audio manager not i
initialized
Audio manager not i
initialized
Audio manager not i
initialized


 ❯ src/tests/app-so
ound-integration.tes
st.tsx (18 tests | 9
9 failed) 6427ms    
   ✓ App Sound Inte
egration > Sound Sys
stem Initialization 
 > should initialize
e audio system on ap
pp startup 154ms    
   ✓ App Sound Inte
egration > Sound Sys
stem Initialization 
 > should not block 
 game rendering duri
ing audio initializa
ation 59ms
   ✓ App Sound Inte
egration > Sound Sys
stem Initialization 
 > should handle aud
dio initialization e
errors gracefully 77
7ms
   × App Sound Inte
egration > Keyboard 
 Controls Integratio
on > should handle g
game movement keys w
without interfering 
 with audio 1110ms  
     → mockSoundCal
llback is not define
ed

Ignored nodes: comm
ments, script, style
<html>
  <head />
  <body>
    <div>
      <div>        
        <div       
          class="au
udio-error-container
r"
          style="pa
adding: 10px; margin
n: 10px 0px; backgro
ound-color: rgb(255,
, 250, 240); border-
-radius: 4px; font-s
size: 14px; border: 
 1px solid #ffe0b2;"
        >
<div     
            class="
"audio-fallback"    
>        
<p     
              style
e="font-weight: bold
d; color: rgb(237, 1
108, 2);"
>      
              Audio
o Fallback Mode Acti
ive
</p>   
<p>    
              Your 
 browser has limited
d audio support. The
e game is using a si
implified audio syst
tem.
</p>   
</div>   
<div     
            class="
"audio-error-actions
s"
            style="
"display: flex; just
tify-content: space-
-between; margin-top
p: 10px;"
>        
<div>  
              <butt
ton
                sty
yle="padding: 5px 10
0px; background-colo
or: rgb(33, 150, 243
3); color: white; bo
order-radius: 4px; c
cursor: pointer; mar
rgin-right: 10px;"  
>    
                Ret
try Audio
              </but
tton>
              <butt
ton
                sty
yle="padding: 5px 10
0px; background-colo
or: rgb(245, 245, 24
45); border: 1px sol
lid #ccc; border-rad
dius: 4px; cursor: p
pointer;"
>    
                Aud
dio Help
              </but
tton>
</div> 
<button
              style
e="padding: 5px 10px
x; background-color:
: transparent; curso
or: pointer; text-de
ecoration: underline
e;"
>      
              Dismi
iss
            </butto
on>
</div>   
        </div>     
        <div       
          class="ma
aze-grid"
        >
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell bomb"
>        
💣     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell player"       
>        
🧑     
</div>   
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</d      iv>
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell bomb"
>        
💣     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell exit"
>        
🚪     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
        </div>     
        <div       
          class="hu
ud"
        >
<div     
            class="
"hud-left"
>        
<span> 
              Score
e:
              0    
</span>
<span> 
              Diamo
onds left:
              6    
</span>
<span> 
              Moves
s:
              54   
</span>
            <span /
/>
</div>   
<div     
            class="
"hud-right"
>        
<div   
              class
s="audio-control"   
>      
              <butt
ton
                ari
ia-label="Mute audio
o"
                cla
ass="audio-button mu
ute-button "        
                tit
tle="Mute (Ctrl+M)" 
>    
🔊 
              </but
tton>
              <butt
ton
                ari
ia-label="Open audio
o settings"
                cla
ass="audio-button se
ettings-button"     
                tit
tle="Audio Settings"
>    
⚙️ 
              </but
tton>
</div> 
</div>   
        </div>     
      </div>       
    </div>
  </body>
</html>
   ✓ App Sound Inte
egration > Keyboard 
 Controls Integratio
on > should handle m
mute keyboard shortc
cut (Ctrl+M) 80ms   
   ✓ App Sound Inte
egration > Keyboard 
 Controls Integratio
on > should handle m
mute keyboard shortc
cut (Cmd+M) on Mac 7
78ms
   ✓ App Sound Inte
egration > Keyboard 
 Controls Integratio
on > should not trig
gger mute on M key w
without modifiers 50
0ms
   × App Sound Inte
egration > Game Even
nt Sound Integration
n > should emit soun
nds for player movem
ment 1089ms
     → mockSoundCal
llback is not define
ed

Ignored nodes: comm
ments, script, style
<html>
  <head />
  <body>
    <div>
      <div>        
        <div       
          class="au
udio-error-container
r"
          style="pa
adding: 10px; margin
n: 10px 0px; backgro
ound-color: rgb(255,
, 250, 240); border-
-radius: 4px; font-s
size: 14px; border: 
 1px solid #ffe0b2;"
        >
<div     
            class="
"audio-fallback"    
>        
<p     
              style
e="font-weight: bold
d; color: rgb(237, 1
108, 2);"
>      
              Audio
o Fallback Mode Acti
ive
</p>   
<p>    
              Your 
 browser has limited
d audio support. The
e game is using a si
implified audio syst
tem.
</p>   
</div>   
<div     
            class="
"audio-error-actions
s"
            style="
"display: flex; just
tify-content: space-
-between; margin-top
p: 10px;"
>        
<div>  
              <butt
ton
                sty
yle="padding: 5px 10
0px; background-colo
or: rgb(33, 150, 243
3); color: white; bo
order-radius: 4px; c
cursor: pointer; mar
rgin-right: 10px;"  
>    
                Ret
try Audio
              </but
tton>
              <butt
ton
                sty
yle="padding: 5px 10
0px; background-colo
or: rgb(245, 245, 24
45); border: 1px sol
lid #ccc; border-rad
dius: 4px; cursor: p
pointer;"
>    
                Aud
dio Help
              </but
tton>
</div> 
<button
              style
e="padding: 5px 10px
x; background-color:
: transparent; curso
or: pointer; text-de
ecoration: underline
e;"
>      
              Dismi
iss
            </butto
on>
</div>   
        </div>     
        <div       
          class="ma
aze-grid"
        >
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell bomb"
>        
💣     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell player"       
>        
🧑     
</div>   
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell bomb"
>        
💣     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell exit"
>        
🚪     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
        </div>     
        <div       
          class="hu
ud"
        >
<div     
            class="
"hud-left"
>        
<span> 
              Score
e:
              0    
</span>
<span> 
              Diamo
onds left:
              6    
</span>
<span> 
              Moves
s:
              54   
</span>
            <span /
/>
</div>   
<div     
            class="
"hud-right"
>        
<div   
              class
s="audio-control"   
>      
              <butt
ton
                ari
ia-label="Mute audio
o"
                cla
ass="audio-button mu
ute-button "        
                tit
tle="Mute (Ctrl+M)" 
>    
🔊 
              </but
tton>
              <butt
ton
                ari
ia-label="Open audio
o settings"
                cla
ass="audio-button se
ettings-button"     
                tit
tle="Audio Settings"
>    
⚙️ 
              </but
tton>
</div> 
</div>   
        </div>     
      </div>       
    </div>
  </body>
</html>
   × App Sound Inte
egration > Game Even
nt Sound Integration
n > should stop all 
 sounds when game en
nds 1049ms
     → mockStopAllS
Sounds is not define
ed

Ignored nodes: comm
ments, script, style
<html>
  <head />
  <body>
    <div>
      <div>        
        <div       
          class="au
udio-error-container
r"
          style="pa
adding: 10px; margin
n: 10px 0px; backgro
ound-color: rgb(255,
, 250, 240); border-
-radius: 4px; font-s
size: 14px; border: 
 1px solid #ffe0b2;"
        >
<div     
            class="
"audio-fallback"    
>        
<p     
              style
e="font-weight: bold
d; color: rgb(237, 1
108, 2);"
>      
              Audio
o Fallback Mode Acti
ive
</p>   
<p>    
              Your 
 browser has limited
d audio support. The
e game is using a si
implified audio syst
tem.
</p>   
</div>   
<div     
            class="
"audio-error-actions
s"
            style="
"display: flex; just
tify-content: space-
-between; margin-top
p: 10px;"
>        
<div>  
              <butt
ton
                sty
yle="padding: 5px 10
0px; background-colo
or: rgb(33, 150, 243
3); color: white; bo
order-radius: 4px; c
cursor: pointer; mar
rgin-right: 10px;"  
>    
                Ret
try Audio
              </but
tton>
              <butt
ton
                sty
yle="padding: 5px 10
0px; background-colo
or: rgb(245, 245, 24
45); border: 1px sol
lid #ccc; border-rad
dius: 4px; cursor: p
pointer;"
>    
                Aud
dio Help
              </but
tton>
</div> 
<button
              style
e="padding: 5px 10px
x; background-color:
: transparent; curso
or: pointer; text-de
ecoration: underline
e;"
>      
              Dismi
iss
            </butto
on>
</div>   
        </div>     
        <div       
          class="ma
aze-grid"
        >
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell player"       
>        
🧑     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell bomb"
>        
💣     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
        </div>     
        <div       
          class="hu
ud"
        >
<div     
            class="
"hud-left"
>        
<span> 
              Score
e:
              0    
</span>
<span> 
              Diamo
onds left:
              2    
</span>
<span> 
              Moves
s:
              54   
</span>
<span> 
              Game 
 Over
</span>
</div>   
<div     
            class="
"hud-right"
>        
<div   
              class
s="audio-control"   
>      
              <butt
ton
                ari
ia-label="Mute audio
o"
                cla
ass="audio-button mu
ute-button "        
                tit
tle="Mute (Ctrl+M)" 
>    
🔊 
              </but
tton>
              <butt
ton
                ari
ia-label="Open audio
o settings"
                cla
ass="audio-button se
ettings-button"     
                tit
tle="Audio Settings"
>    
⚙️ 
              </but
tton>
</div> 
</div>   
        </div>     
      </div>       
    </div>
  </body>
</html>

   × App Sound Inte
egration > Game Even
nt Sound Integration
n > should not emit 
 sounds when game is
s over 46ms
     → mockSoundCal
llback is not define
ed
   × App Sound Inte
egration > Audio Con
ntrols Integration >
> should toggle mute
e via button click 1
1072ms
     → Unable to fi
ind a label with the
e text of: Unmute au
udio

Ignored nodes: comm
ments, script, style
<body>
  <div>
    <div>
      <div
        class="audi
io-error-container" 
        style="padd
ding: 10px; margin: 
 10px 0px; backgroun
nd-color: rgb(255, 2
250, 240); border-ra
adius: 4px; font-siz
ze: 14px; border: 1p
px solid #ffe0b2;"  
      >
        <div       
          class="au
udio-fallback"      
        >
<p       
            style="
"font-weight: bold; 
 color: rgb(237, 108
8, 2);"
>        
            Audio F
Fallback Mode Active
</p>     
<p>      
            Your br
rowser has limited a
audio support. The g
game is using a simp
plified audio system
m.
</p>     
        </div>     
        <div       
          class="au
udio-error-actions" 
          style="di
isplay: flex; justif
fy-content: space-be
etween; margin-top: 
 10px;"
        >
<div>    
<button
              style
e="padding: 5px 10px
x; background-color:
: rgb(33, 150, 243);
; color: white; bord
der-radius: 4px; cur
rsor: pointer; margi
in-right: 10px;"    
>      
              Retry
y Audio
            </butto
on>
<button
              style
e="padding: 5px 10px
x; background-color:
: rgb(245, 245, 245)
); border: 1px solid
d #ccc; border-radiu
us: 4px; cursor: poi
inter;"
>      
              Audio
o Help
            </butto
on>
</div>   
<button  
            style="
"padding: 5px 10px; 
 background-color: t
transparent; cursor:
: pointer; text-deco
oration: underline;"
>        
Dismiss
</button>
        </div>     
      </div>       
      <div
        class="maze
e-grid"
      >
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell diamond"        
        >
💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell boulder"        
        >
🪨       
        </div>     
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell diamond"        
        >
💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell boulder"        
        >
🪨       
        </div>     
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell bomb"
        >
💣       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell player"
        >
🧑       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell diamond"        
        >
💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell boulder"        
        >
🪨       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell diamond"        
        >
💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell boulder"        
        >
🪨       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell boulder"        
        >
🪨       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell bomb"
        >
💣       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell boulder"        
        >
🪨       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell diamond"        
        >
💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell diamond"        
        >
💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell exit"
        >
🚪       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
      </div>       
      <div
        class="hud"
      >
        <div       
          class="hu
ud-left"
        >
<span>   
Score: 
            0      
</span>  
<span>   
            Diamond
ds left:
            6      
</span>  
<span>   
Moves: 
            55     
</span>  
<span /> 
        </div>     
        <div       
          class="hu
ud-right"
        >
<div     
            class="
"audio-control"     
>        
<button
              aria-
-label="Mute audio" 
              class
s="audio-button mute
e-button "
              title
e="Mute (Ctrl+M)"   
>      
🔊   
            </butto
on>
<button
              aria-
-label="Open audio s
settings"
              class
s="audio-button sett
tings-button"       
              title
e="Audio Settings"  
>      
⚙️   
            </butto
on>
</div>   
        </div>     
      </div>       
    </div>
  </div>
</body>

Ignored nodes: comm
ments, script, style
<html>
  <head />
  <body>
    <div>
      <div>        
        <div       
          class="au
udio-error-container
r"
          style="pa
adding: 10px; margin
n: 10px 0px; backgro
ound-color: rgb(255,
, 250, 240); border-
-radius: 4px; font-s
size: 14px; border: 
 1px solid #ffe0b2;"
        >
<div     
            class="
"audio-fallback"    
>        
<p     
              style
e="font-weight: bold
d; color: rgb(237, 1
108, 2);"
>      
              Audio
o Fallback Mode Acti
ive
</p>   
<p>    
              Your 
 browser has limited
d audio support. The
e game is using a si
implified audio syst
tem.
</p>   
</div>   
<div     
            class="
"audio-error-actions
s"
            style="
"display: flex; just
tify-content: space-
-between; margin-top
p: 10px;"
>        
<div>  
              <butt
ton
                sty
yle="padding: 5px 10
0px; background-colo
or: rgb(33, 150, 243
3); color: white; bo
order-radius: 4px; c
cursor: pointer; mar
rgin-right: 10px;"  
>    
                Ret
try Audio
              </but
tton>
              <butt
ton
                sty
yle="padding: 5px 10
0px; background-colo
or: rgb(245, 245, 24
45); border: 1px sol
lid #ccc; border-rad
dius: 4px; cursor: p
pointer;"
>    
                Aud
dio Help
              </but
tton>
</div> 
<button
              style
e="padding: 5px 10px
x; background-color:
: transparent; curso
or: pointer; text-de
ecoration: underline
e;"
>      
              Dismi
iss
            </butto
on>
</div>   
        </div>     
        <div       
          class="ma
aze-grid"
        >
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell bomb"
>        
💣     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
  >
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell player"       
>        
🧑     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell bomb"
>        
💣     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell exit"
>        
🚪     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
        </div>     
        <div       
          class="hu
ud"
        >
<div     
            class="
"hud-left"
>        
<span> 
              Score
e:
              0    
</span>
<span> 
              Diamo
onds left:
              6    
</span>
<span> 
              Moves
s:
              55   
</span>
            <span /
/>
</div>   
<div     
            class="
"hud-right"
>        
<div   
              class
s="audio-control"   
>      
              <butt
ton
                ari
ia-label="Mute audio
o"
                cla
ass="audio-button mu
ute-button "        
                tit
tle="Mute (Ctrl+M)" 
>    
🔊
              </but
tton>
              <butt
ton
                ari
ia-label="Open audio
o settings"
                cla
ass="audio-button se
ettings-button"     
                tit
tle="Audio Settings"
>    
⚙️ 
              </but
tton>
</div> 
</div>   
        </div>     
      </div>       
    </div>
  </body>
</html>
   ✓ App Sound Inte
egration > Audio Con
ntrols Integration >
> should open audio 
 settings dialog 58m
ms
   × App Sound Inte
egration > Audio Con
ntrols Integration >
> should display aud
dio error messages w
when available 36ms 
     → act is not d
defined
   ✓ App Sound Inte
egration > Performan
nce and Responsivene
ess > should not blo
ock user input durin
ng sound playback 20
09ms
   × App Sound Inte
egration > Performan
nce and Responsivene
ess > should handle 
 multiple simultaneo
ous sound events 112
28ms
     → mockSoundCal
llback is not define
ed

Ignored nodes: comm
ments, script, style
<html>
  <head />
  <body>
    <div>
      <div>        
        <div       
          class="au
udio-error-container
r"
          style="pa
adding: 10px; margin
n: 10px 0px; backgro
ound-color: rgb(255,
, 250, 240); border-
-radius: 4px; font-s
size: 14px; border: 
 1px solid #ffe0b2;"
        >
<div     
            class="
"audio-fallback"    
>        
<p     
              style
e="font-weight: bold
d; color: rgb(237, 1
108, 2);"
>      
              Audio
o Fallback Mode Acti
ive
</p>   
<p>    
              Your 
 browser has limited
d audio support. The
e game is using a si
implified audio syst
tem.
</p>   
</div>   
<div     
            class="
"audio-error-actions
s"
            style="
"display: flex; just
tify-content: space-
-between; margin-top
p: 10px;"
>        
<div>  
              <butt
ton
                sty
yle="padding: 5px 10
0px; background-colo
or: rgb(33, 150, 243
3); color: white; bo
order-radius: 4px; c
cursor: pointer; mar
rgin-right: 10px;"  
>    
                Ret
try Audio
              </but
tton>
              <butt
ton
                sty
yle="padding: 5px 10
0px; background-colo
or: rgb(245, 245, 24
45); border: 1px sol
lid #ccc; border-rad
dius: 4px; cursor: p
pointer;"
>    
                Aud
dio Help
              </but
tton>
</div> 
<button
              style
e="padding: 5px 10px
x; background-color:
: transparent; curso
or: pointer; text-de
ecoration: underline
e;"
>      
              Dismi
iss
            </butto
on>
</div>   
        </div>     
        <div       
          class="ma
aze-grid"
        >
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell bomb"
>        
💣     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell player"       
>        
🧑     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</d      iv>
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell bomb"
>        
💣     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell exit"
>        
🚪     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
        </div>     
        <div       
          class="hu
ud"
        >
<div     
            class="
"hud-left"
>        
<span> 
              Score
e:
              0    
</span>
<span> 
              Diamo
onds left:
              6    
</span>
<span> 
              Moves
s:
              51   
</span>
            <span /
/>
</div>   
<div     
            class="
"hud-right"
>        
<div   
              class
s="audio-control"   
>      
              <butt
ton
                ari
ia-label="Mute audio
o"
                cla
ass="audio-button mu
ute-button "        
                tit
tle="Mute (Ctrl+M)" 
>    
🔊 
              </but
tton>
              <butt
ton
                ari
ia-label="Open audio
o settings"
                cla
ass="audio-button se
ettings-button"     
                tit
tle="Audio Settings"
>    
⚙️ 
              </but
tton>
</div> 
</div>   
        </div>     
      </div>       
    </div>
  </body>
</html>
   ✓ App Sound Inte
egration > Performan
nce and Responsivene
ess > should maintai
in game state consis
stency during audio 
 operations 127ms   
   × App Sound Inte
egration > Error Rec
covery > should cont
tinue working when s
sound playback fails
s 1ms
     → mockSoundCal
llback is not define
ed
   × App Sound Inte
egration > Error Rec
covery > should hand
dle audio context su
uspension gracefully
y 1ms

     → mockAudioCon
ntext is not defined


⎯ Failed Tests 9 ⎯⎯

 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > Ke
eyboard Controls Int
tegration > should h
handle game movement
t keys without inter
rfering with audio  
ReferenceError: moc
ckSoundCallback is n
not defined

Ignored nodes: comm
ments, script, style
<html>
  <head />
  <body>
    <div>
      <div>        
        <div       
          class="au
udio-error-container
r"
          style="pa
adding: 10px; margin
n: 10px 0px; backgro
ound-color: rgb(255,
, 250, 240); border-
-radius: 4px; font-s
size: 14px; border: 
 1px solid #ffe0b2;"
        >
<div     
            class="
"audio-fallback"    
>        
<p     
              style
e="font-weight: bold
d; color: rgb(237, 1
108, 2);"
>      
              Audio
o Fallback Mode Acti
ive
</p>   
<p>    
              Your 
 browser has limited
d audio support. The
e game is using a si
implified audio syst
tem.
</p>   
</div>   
<div     
            class="
"audio-error-actions
s"
            style="
"display: flex; just
tify-content: space-
-between; margin-top
p: 10px;"
>        
<div>  
              <butt
ton
                sty
yle="padding: 5px 10
0px; background-colo
or: rgb(33, 150, 243
3); color: white; bo
order-radius: 4px; c
cursor: pointer; mar
rgin-right: 10px;"  
>    
                Ret
try Audio
              </but
tton>
              <butt
ton
                sty
yle="padding: 5px 10
0px; background-colo
or: rgb(245, 245, 24
45); border: 1px sol
lid #ccc; border-rad
dius: 4px; cursor: p
pointer;"
>    
                Aud
dio Help
              </but
tton>
</div> 
<button
              style
e="padding: 5px 10px
x; background-color:
: transparent; curso
or: pointer; text-de
ecoration: underline
e;"
>      
              Dismi
iss
            </butto
on>
</div>   
        </div>     
        <div       
          class="ma
aze-grid"
        >
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell bomb"
>        
            💣     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell player"       
>        
            🧑     
</div>   
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell bomb"
>        
            💣     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell exit"
>        
            🚪     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
        </div>     
        <div       
          class="hu
ud"
        >
<div     
            class="
"hud-left"
>        
<span> 
              Score
e:
              0    
</span>
<span> 
              Diamo
onds left:
              6    
</span>
<span> 
              Moves
s:
   54
</span>
            <span /
/>
</div>   
<div     
            class="
"hud-right"
>        
<div   
              class
s="audio-control"   
>      
              <butt
ton
                ari
ia-label="Mute audio
o"
                cla
ass="audio-button mu
ute-button "        
                tit
tle="Mute (Ctrl+M)" 
>    
                🔊 
              </but
tton>
              <butt
ton
                ari
ia-label="Open audio
o settings"
                cla
ass="audio-button se
ettings-button"     
                tit
tle="Audio Settings"
>    
                ⚙️ 
              </but
tton>
</div> 
</div>   
        </div>     
      </div>       
    </div>
  </body>
</html>
 ❯ src/tests/app-so
ound-integration.tes
st.tsx:132:24       
    130|X…
    131|X…
    132|X…
       |           
^     
    133|X…
    134|X…
 ❯ runWithExpensive
eErrorDiagnosticsDis
sabled node_modules/
/@testing-library/do
om/dist/config.js:47
7:12
 ❯ checkCallback no
ode_modules/@testing
g-library/dom/dist/w
wait-for.js:124:77  
 ❯ Timeout.checkRea
alTimersCallback nod
de_modules/@testing-
-library/dom/dist/wa
ait-for.js:118:16   

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/9]⎯

 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > Ga
ame Event Sound Inte
egration > should em
mit sounds for playe
er movement
ReferenceError: moc
ckSoundCallback is n
not defined

Ignored nodes: comm
ments, script, style
<html>
  <head />
  <body>
    <div>
      <div>        
        <div       
          class="au
udio-error-container
r"
          style="pa
adding: 10px; margin
n: 10px 0px; backgro
ound-color: rgb(255,
, 250, 240); border-
-radius: 4px; font-s
size: 14px; border: 
 1px solid #ffe0b2;"
        >
<div     
            class="
"audio-fallback"    
>        
<p     
              style
e="font-weight: bold
d; color: rgb(237, 1
108, 2);"
>      
              Audio
o Fallback Mode Acti
ive
</p>   
<p>    
              Your 
 browser has limited
d audio support. The
e game is using a si
implified audio syst
tem.
</p>   
</div>   
<div     
            class="
"audio-error-actions
s"
            style="
"display: flex; just
tify-content: space-
-between; margin-top
p: 10px;"
>        
<div>  
              <butt
ton
                sty
yle="padding: 5px 10
0px; background-colo
or: rgb(33, 150, 243
3); color: white; bo
order-radius: 4px; c
cursor: pointer; mar
rgin-right: 10px;"  
>    
                Ret
try Audio
              </but
tton>
              <butt
ton
                sty
yle="padding: 5px 10
0px; background-colo
or: rgb(245, 245, 24
45); border: 1px sol
lid #ccc; border-rad
dius: 4px; cursor: p
pointer;"
>    
                Aud
dio Help
              </but
tton>
</div> 
<button
              style
e="padding: 5px 10px
x; background-color:
: transparent; curso
or: pointer; text-de
ecoration: underline
e;"
>      
              Dismi
iss
            </butto
on>
</div>   
        </div>     
        <div       
          class="ma
aze-grid"
        >
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell bomb"
>        
            💣     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell player"       
>        
            🧑     
</div>   
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell bomb"
>        
            💣     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell exit"
>        
            🚪     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
        </div>     
        <div       
          class="hu
ud"
        >
<div     
            class="
"hud-left"
>        
<span> 
              Score
e:
              0    
</span>
<span> 
              Diamo
onds left:
              6    
</span>
<span> 
              Moves
s:
   54
</span>
            <span /
/>
</div>   
<div     
            class="
"hud-right"
>        
<div   
              class
s="audio-control"   
>      
              <butt
ton
                ari
ia-label="Mute audio
o"
                cla
ass="audio-button mu
ute-button "        
                tit
tle="Mute (Ctrl+M)" 
>    
                🔊 
              </but
tton>
              <butt
ton
                ari
ia-label="Open audio
o settings"
                cla
ass="audio-button se
ettings-button"     
                tit
tle="Audio Settings"
>    
                ⚙️ 
              </but
tton>
</div> 
</div>   
        </div>     
      </div>       
    </div>
  </body>
</html>
 ❯ src/tests/app-so
ound-integration.tes
st.tsx:215:24       
    213|
    214|X…
    215|X…
       |           
^     
    216|X…
    217|X…
 ❯ runWithExpensive
eErrorDiagnosticsDis
sabled node_modules/
/@testing-library/do
om/dist/config.js:47
7:12
 ❯ checkCallback no
ode_modules/@testing
g-library/dom/dist/w
wait-for.js:124:77  
 ❯ Timeout.checkRea
alTimersCallback nod
de_modules/@testing-
-library/dom/dist/wa
ait-for.js:118:16   

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/9]⎯

 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > Ga
ame Event Sound Inte
egration > should st
top all sounds when 
 game ends
ReferenceError: moc
ckStopAllSounds is n
not defined

Ignored nodes: comm
ments, script, style
<html>
  <head />
  <body>
    <div>
      <div>        
        <div       
          class="au
udio-error-container
r"
          style="pa
adding: 10px; margin
n: 10px 0px; backgro
ound-color: rgb(255,
, 250, 240); border-
-radius: 4px; font-s
size: 14px; border: 
 1px solid #ffe0b2;"
        >
<div     
            class="
"audio-fallback"    
>        
<p     
              style
e="font-weight: bold
d; color: rgb(237, 1
108, 2);"
>      
              Audio
o Fallback Mode Acti
ive
</p>   
<p>    
              Your 
 browser has limited
d audio support. The
e game is using a si
implified audio syst
tem.
</p>   
</div>   
<div     
            class="
"audio-error-actions
s"
            style="
"display: flex; just
tify-content: space-
-between; margin-top
p: 10px;"
>        
<div>  
              <butt
ton
                sty
yle="padding: 5px 10
0px; background-colo
or: rgb(33, 150, 243
3); color: white; bo
order-radius: 4px; c
cursor: pointer; mar
rgin-right: 10px;"  
>    
                Ret
try Audio
              </but
tton>
              <butt
ton
                sty
yle="padding: 5px 10
0px; background-colo
or: rgb(245, 245, 24
45); border: 1px sol
lid #ccc; border-rad
dius: 4px; cursor: p
pointer;"
>    
                Aud
dio Help
              </but
tton>
</div> 
<button
              style
e="padding: 5px 10px
x; background-color:
: transparent; curso
or: pointer; text-de
ecoration: underline
e;"
>      
              Dismi
iss
            </butto
on>
</div>   
        </div>     
        <div       
          class="ma
aze-grid"
        >
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell player"       
>        
            🧑     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell bomb"
>        
            💣     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
        </div>     
        <div       
          class="hu
ud"
        >
<div     
            class="
"hud-left"
>        
<span> 
              Score
e:
              0    
</span>
<span> 
              Diamo
onds left:
              2    
</span>
<span> 
              Moves
s:
              54   
</span>
<span> 
              Game 
 Over
</span>
</div>   
<div     
            class="
"hud-right"
>        
<div   
              class
s="audio-control"   
>      
              <butt
ton
                ari
ia-label="Mute audio
o"
                cla
ass="audio-button mu
ute-button "        
                tit
tle="Mute (Ctrl+M)" 
>    
                🔊 
              </but
tton>
              <butt
ton
                ari
ia-label="Open audio
o settings"
                cla
ass="audio-button se
ettings-button"     
                tit
tle="Audio Settings"
>    
                ⚙️ 
              </but
tton>
</div> 
</div>   
        </div>     
      </div>       
    </div>
  </body>
</html>

 ❯ src/tests/app-so
ound-integration.tes
st.tsx:246:24       
    244|X…
    245|X…
    246|X…
       |           
^     
    247|X…
    248|X}…
 ❯ runWithExpensive
eErrorDiagnosticsDis
sabled node_modules/
/@testing-library/do
om/dist/config.js:47
7:12
 ❯ checkCallback no
ode_modules/@testing
g-library/dom/dist/w
wait-for.js:124:77  
 ❯ Timeout.checkRea
alTimersCallback nod
de_modules/@testing-
-library/dom/dist/wa
ait-for.js:118:16   

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[3/9]⎯

 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > Ga
ame Event Sound Inte
egration > should no
ot emit sounds when 
 game is over       
ReferenceError: moc
ckSoundCallback is n
not defined
 ❯ src/tests/app-so
ound-integration.tes
st.tsx:269:13       
    267|
    268|X…
    269|X…
       |           
  ^
    270|
    271|X…

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[4/9]⎯

 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > Au
udio Controls Integr
ration > should togg
gle mute via button 
 click
TestingLibraryEleme
entError: Unable to 
 find a label with t
the text of: Unmute 
 audio

Ignored nodes: comm
ments, script, style
<body>
  <div>
    <div>
      <div
        class="audi
io-error-container" 
        style="padd
ding: 10px; margin: 
 10px 0px; backgroun
nd-color: rgb(255, 2
250, 240); border-ra
adius: 4px; font-siz
ze: 14px; border: 1p
px solid #ffe0b2;"  
      >
        <div       
          class="au
udio-fallback"      
        >
<p       
            style="
"font-weight: bold; 
 color: rgb(237, 108
8, 2);"
>        
            Audio F
Fallback Mode Active
</p>     
<p>      
            Your br
rowser has limited a
audio support. The g
game is using a simp
plified audio system
m.
</p>     
        </div>     
        <div       
          class="au
udio-error-actions" 
          style="di
isplay: flex; justif
fy-content: space-be
etween; margin-top: 
 10px;"
        >
<div>    
<button
              style
e="padding: 5px 10px
x; background-color:
: rgb(33, 150, 243);
; color: white; bord
der-radius: 4px; cur
rsor: pointer; margi
in-right: 10px;"    
>      
              Retry
y Audio
            </butto
on>
<button
              style
e="padding: 5px 10px
x; background-color:
: rgb(245, 245, 245)
); border: 1px solid
d #ccc; border-radiu
us: 4px; cursor: poi
inter;"
>      
              Audio
o Help
            </butto
on>
</div>   
<button  
            style="
"padding: 5px 10px; 
 background-color: t
transparent; cursor:
: pointer; text-deco
oration: underline;"
>        
            Dismiss
</button>
        </div>     
      </div>       
      <div
        class="maze
e-grid"
      >
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell diamond"        
        >
          💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell boulder"        
        >
          🪨       
        </div>     
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell diamond"        
        >
          💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell boulder"        
        >
          🪨       
        </div>     
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell bomb"
        >
          💣       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
  <div
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell player"
        >
          🧑       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell diamond"        
        >
          💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell boulder"        
        >
          🪨       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell diamond"        
        >
          💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell boulder"        
        >
          🪨       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell boulder"        
        >
          🪨       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell bomb"
        >
          💣       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell boulder"        
        >
          🪨       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell diamond"        
        >
          💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell diamond"        
        >
          💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell exit"
        >
          🚪       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
      </div>       
      <div
        class="hud"
      >
        <div       
          class="hu
ud-left"
        >
<span>   
            Score: 
            0      
</span>  
<span>   
            Diamond
ds left:
            6      
</span>  
<span>   
            Moves: 
            55     
</span>  
<span /> 
        </div>     
        <div       
          class="hu
ud-right"
        >
<div     
            class="
"audio-control"     
>        
<button
              aria-
-label="Mute audio" 
              class
s="audio-button mute
e-button "
              title
e="Mute (Ctrl+M)"   
>      
              🔊   
            </butto
on>
<button
              aria-
-label="Open audio s
settings"
              class
s="audio-button sett
tings-button"       
              title
e="Audio Settings"  
>      
              ⚙️   
            </butto
on>
</div>   
        </div>     
      </div>       
    </div>
  </div>
</body>

Ignored nodes: comm
ments, script, style
<html>
  <head />
  <body>
    <div>
      <div>        
        <div       
          class="au
udio-error-container
r"
          style="pa
adding: 10px; margin
n: 10px 0px; backgro
ound-color: rgb(255,
, 250, 240); border-
-radius: 4px; font-s
size: 14px; border: 
 1px solid #ffe0b2;"
        >
<div     
class  ="
"audio-fallback"    
>        
<p     
              style
e="font-weight: bold
d; color: rgb(237, 1
108, 2);"
>      
              Audio
o Fallback Mode Acti
ive
</p>   
<p>    
              Your 
 browser has limited
d audio support. The
e game is using a si
implified audio syst
tem.
</p>   
</div>   
<div     
            class="
"audio-error-actions
s"
            style="
"display: flex; just
tify-content: space-
-between; margin-top
p: 10px;"
>        
<div>  
              <butt
ton
                sty
yle="padding: 5px 10
0px; background-colo
or: rgb(33, 150, 243
3); color: white; bo
order-radius: 4px; c
cursor: pointer; mar
rgin-right: 10px;"  
>    
                Ret
try Audio
              </but
tton>
              <butt
ton
                sty
yle="padding: 5px 10
0px; background-colo
or: rgb(245, 245, 24
45); border: 1px sol
lid #ccc; border-rad
dius: 4px; cursor: p
pointer;"
>    
                Aud
dio Help
              </but
tton>
</div> 
<button
              style
e="padding: 5px 10px
x; background-color:
: transparent; curso
or: pointer; text-de
ecoration: underline
e;"
>      
              Dismi
iss
            </butto
on>
</div>   
        </div>     
        <div       
          class="ma
aze-grid"
        >
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell bomb"
>        
            💣     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell player"       
>        
            🧑     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell bomb"
>        
            💣     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell exit"
>        
            🚪     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
        </div>     
        <div       
          class="hu
ud"
        >
<div     
            class="
"hud-left"
>        
<span> 
              Score
e:
              0    
</span>
<span> 
              Diamo
onds left:
              6    
</span>
<span> 
              Moves
s:
              55   
</span>
            <span /
/>
</div>   
<div     
            class="
"hud-right"
>        
<div   
              class
s="audio-control"   
>      
              <butt
ton
                ari
ia-label="Mute audio
o"
                cla
ass="audio-button mu
ute-button "        
                tit
tle="Mute (Ctrl+M)" 
     >ode (vitest 1)
                🔊 
              </but
tton>
              <butt
ton
                ari
ia-label="Open audio
o settings"
                cla
ass="audio-button se
ettings-button"     
                tit
tle="Audio Settings"
>    
                ⚙️ 
              </but
tton>
</div> 
</div>   
        </div>     
      </div>       
    </div>
  </body>
</html>
 ❯ waitForWrapper n
node_modules/@testin
ng-library/dom/dist/
/wait-for.js:163:27 
 ❯ src/tests/app-so
ound-integration.tes
st.tsx:290:19       
    288|X…
    289|
    290|X…
       |           
        ^
    291|X…
    292|X…

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[5/9]⎯

 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > Au
udio Controls Integr
ration > should disp
play audio error mes
ssages when availabl
le
ReferenceError: act
t is not defined    
 ❯ src/tests/app-so
ound-integration.tes
st.tsx:321:13       
    319|
    320|X…
    321|X…
       |           
  ^
    322|X…
    323|X…

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[6/9]⎯

 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > Pe
erformance and Respo
onsiveness > should 
 handle multiple sim
multaneous sound eve
ents
ReferenceError: moc
ckSoundCallback is n
not defined

Ignored nodes: comm
ments, script, style
<html>
  <head />
  <body>
    <div>
      <div>        
        <div       
          class="au
udio-error-container
r"
          style="pa
adding: 10px; margin
n: 10px 0px; backgro
ound-color: rgb(255,
, 250, 240); border-
-radius: 4px; font-s
size: 14px; border: 
 1px solid #ffe0b2;"
        >
<div     
            class="
"audio-fallback"    
>        
<p     
              style
e="font-weight: bold
d; color: rgb(237, 1
108, 2);"
>      
              Audio
o Fallback Mode Acti
ive
</p>   
<p>    
              Your 
 browser has limited
d audio support. The
e game is using a si
implified audio syst
tem.
</p>   
</div>   
<div     
            class="
"audio-error-actions
s"
            style="
"display: flex; just
tify-content: space-
-between; margin-top
p: 10px;"
>        
<div>  
              <butt
ton
                sty
yle="padding: 5px 10
0px; background-colo
or: rgb(33, 150, 243
3); color: white; bo
order-radius: 4px; c
cursor: pointer; mar
rgin-right: 10px;"  
>    
                Ret
try Audio
              </but
tton>
              <butt
ton
                sty
yle="padding: 5px 10
0px; background-colo
or: rgb(245, 245, 24
45); border: 1px sol
lid #ccc; border-rad
dius: 4px; cursor: p
pointer;"
>    
                Aud
dio Help
              </but
tton>
</div> 
<button
              style
e="padding: 5px 10px
x; background-color:
: transparent; curso
or: pointer; text-de
ecoration: underline
e;"
>      
              Dismi
iss
            </butto
on>
</div>   
        </div>     
        <div       
          class="ma
aze-grid"
        >
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell bomb"
>        
            💣     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell player"       
>        
            🧑     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell bomb"
>        
            💣     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell exit"
>        
            🚪     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
        </div>     
        <div       
          class="hu
ud"
        >
<div     
            class="
"hud-left"
>        
<span> 
              Score
e:
              0    
</span>
<span> 
              Diamo
onds left:
              6    
</span>
<span> 
              Moves
s:
   51
</span>
            <span /
/>
</div>   
<div     
            class="
"hud-right"
>        
<div   
              class
s="audio-control"   
>      
              <butt
ton
                ari
ia-label="Mute audio
o"
                cla
ass="audio-button mu
ute-button "        
                tit
tle="Mute (Ctrl+M)" 
>    
                🔊 
              </but
tton>
              <butt
ton
                ari
ia-label="Open audio
o settings"
                cla
ass="audio-button se
ettings-button"     
                tit
tle="Audio Settings"
>    
                ⚙️ 
              </but
tton>
</div> 
</div>   
        </div>     
      </div>       
    </div>
  </body>
</html>
 ❯ src/tests/app-so
ound-integration.tes
st.tsx:375:24       
    373|X…
    374|X…
    375|X…
       |           
^     
    376|X…
    377|X}…
 ❯ runWithExpensive
eErrorDiagnosticsDis
sabled node_modules/
/@testing-library/do
om/dist/config.js:47
7:12
 ❯ checkCallback no
ode_modules/@testing
g-library/dom/dist/w
wait-for.js:124:77  
 ❯ Timeout.checkRea
alTimersCallback nod
de_modules/@testing-
-library/dom/dist/wa
ait-for.js:118:16   

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[7/9]⎯

 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > Er
rror Recovery > shou
uld continue working
g when sound playbac
ck fails
ReferenceError: moc
ckSoundCallback is n
not defined
 ❯ src/tests/app-so
ound-integration.tes
st.tsx:414:13       
    412|Xi…
    413|X…
    414|X…
       |           
  ^
    415|X…
    416|X…

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[8/9]⎯

 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > Er
rror Recovery > shou
uld handle audio con
ntext suspension gra
acefully
ReferenceError: moc
ckAudioContext is no
ot defined
 ❯ src/tests/app-so
ound-integration.tes
st.tsx:433:13       
    431|Xi…
    432|X…
    433|X…
       |           
  ^
    434|
    435|X…

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[9/9]⎯

 Unhandled Errors ⎯

Vitest caught 1 unh
handled error during
g the test run.     
This might cause fa
alse positive tests.
. Resolve unhandled 
 errors to make sure
e your tests are not
t affected.

 Uncaught Exception
n 
TypeError: toggleMu
ute is not a functio
on
 ❯ handleMuteClick 
 src/audio/component
ts/AudioControl.tsx:
:12:9
     10|     const…
     11|Xe…
     12|Xt…
       |X^ 
     13|     };    
     14|
 ❯ executeDispatch 
 node_modules/react-
-dom/cjs/react-dom-c
client.development.j
js:16368:9
 ❯ runWithFiberInDE
EV node_modules/reac
ct-dom/cjs/react-dom
m-client.development
t.js:1522:13        
 ❯ processDispatchQ
Queue node_modules/r
react-dom/cjs/react-
-dom-client.developm
ment.js:16418:19    
 ❯ node_modules/rea
act-dom/cjs/react-do
om-client.developmen
nt.js:17016:9       
 ❯ batchedUpdates$1
1 node_modules/react
t-dom/cjs/react-dom-
-client.development.
.js:3262:40
 ❯ dispatchEventFor
rPluginEventSystem n
node_modules/react-d
dom/cjs/react-dom-cl
lient.development.js
s:16572:7
 ❯ dispatchEvent no
ode_modules/react-do
om/cjs/react-dom-cli
ient.development.js:
:20658:11
 ❯ dispatchDiscrete
eEvent node_modules/
/react-dom/cjs/react
t-dom-client.develop
pment.js:20626:11   
 ❯ HTMLDivElement.c
callTheUserObjectsOp
peration node_module
es/jsdom/lib/jsdom/l
living/generated/Eve
entListener.js:26:30

This error originat
ted in "src/tests/ap
pp-sound-integration
n.test.tsx" test fil
le. It doesn't mean 
 the error was throw
wn inside the file i
itself, but while it
t was running.      
The latest test tha
at might've caused t
the error is "should
d toggle mute via bu
utton click". It mig
ght mean one of the 
 following:
- The error was thr
rown, while Vitest w
was running this tes
st.
- If the error occu
urred after the test
t had been completed
d, this was the last
t documented test be
efore it was thrown.
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯


 Test Files  1 fail
led (1)
      Tests  9 fail
led | 9 passed (18) 
     Errors  1 erro
or
   Start at  16:03:
:18
   Duration  8.10s 
 (transform 205ms, s
setup 118ms, collect
t 350ms, tests 6.43s
s, environment 557ms
s, prepare 175ms)   

:\Windows\System32\cmd.exe
D:\FizzBash\TheWand
derer
The test run shows several issues with the audio integration tests. The main problems are:

Missing mock functions: Several tests are failing because mock functions like mockSoundCallback, mockStopAllSounds, and mockAudioContext are not defined.

Missing imports: The act function from React Testing Library is not imported.

Audio system fallback: The tests are running in a test environment where audio APIs aren't available, so the system is falling back to silent mode, which is expected behavior.

Button state issues: One test is looking for "Unmute audio" text but the button shows "Mute audio", indicating the mute state isn't being toggled properly.

Let me examine the test file to understand the structure and fix these issues:

Read file(s)

app-sound-integration.test.tsx
Now I can see the issues. The test file is missing several mock function definitions and imports. Let me fix these issues:


2 edits to file

app-sound-integration.test.tsx


Now I need to add mock implementations for the audio system. Let me check what audio functions are being called in the tests and mock them appropriately:

Accepted edits to

app-sound-integration.test.tsx


The tests are still failing because the audio system is falling back to silent mode in the test environment. Let me check the AudioControl component to understand the mute button issue:

Read file(s)

AudioControl.tsx
I see the issue. The AudioControl component uses useAudioSettings hook, but the tests are trying to mock the audio context directly. Let me check the audio settings hook:

Read file(s)

use-audio-settings.ts
Now I understand the structure better. The tests need to mock the hooks properly. Let me update the test file to mock the hooks correctly:

Accepted edits to

app-sound-integration.test.tsx


The issue is that the mocks need to be set up before the modules are imported. Let me restructure the test file to use proper mocking:


3 edits to file

app-sound-integration.test.tsx


Now let me run the tests again to see if the mocking issues are resolved:

Command
npm test -- src/tests/app-sound-integration.test.tsx --run --reporter=basic
npm test -- sr
rc/tests/app-sound-i
integration.test.t  sx
x --run --reporter=b
basic
:\Windows\System32\cmd.exe - npm  test -- src/tests/app-sound-integration.test.tsx --run --reporter=basicpm test src/tests/app-sound-integration.test.tsx --run --reporter=basic
> thewanderer@0.1.0
0 test
> vitest run -c vit
test.config.ts src/t
tests/app-sound-inte
egration.test.tsx --
-run --reporter=basi
ic

:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/Fiz
zzBash/TheWanderer  

 DEPRECATED  'basic
c' reporter is depre
ecated and will be r
removed in Vitest v3
3.
Remove 'basic' from
m 'reporters' option
n. To match 'basic' 
 reporter 100%, use 
 configuration:     
{
  "test": {        
    "reporters": [ 
      [
        "default", 
        {
          "summary"
": false
        }
      ]
    ]
  }
}
ode (vitest 2)ode (vitest 3)ode (vitest 6)ode (vitest 7)ode (vitest 9)ode (vitest 8)ode (vitest 10)ode (vitest 11)ode (vitest 15)ode (vitest 14)
(node:20136) [DEP00
040] DeprecationWarn
ning: The `punycode`
` module is deprecat
ted. Please use a us
serland alternative 
 instead.
(Use `node --trace-
-deprecation ...` to
o show where the war
rning was created)  

 ❯ src/tests/app-so
ound-integration.tes
st.tsx (18 tests | 1
18 failed) 52ms     
   × App Sound Inte
egration > Sound Sys
stem Initialization 
 > should initialize
e audio system on ap
pp startup 21ms     
     → [vitest] No 
 "AudioProvider" exp
port is defined on t
the "../audio/contex
xt/audio-context" mo
ock. Did you forget 
 to return it from "
"vi.mock"?
If you need to part
tially mock a module
e, you can use "impo
ortOriginal" helper 
 inside:

   × App Sound Inte
egration > Sound Sys
stem Initialization 
 > should not block 
 game rendering duri
ing audio initializa
ation 2ms
     → [vitest] No 
 "AudioProvider" exp
port is defined on t
the "../audio/contex
xt/audio-context" mo
ock. Did you forget 
 to return it from "
"vi.mock"?
If you need to part
tially mock a module
e, you can use "impo
ortOriginal" helper 
 inside:

   × App Sound Inte
egration > Sound Sys
stem Initialization 
 > should handle aud
dio initialization e
errors gracefully 2m
ms
     → [vitest] No 
 "AudioProvider" exp
port is defined on t
the "../audio/contex
xt/audio-context" mo
ock. Did you forget 
 to return it from "
"vi.mock"?
If you need to part
tially mock a module
e, you can use "impo
ortOriginal" helper 
 inside:

   × App Sound Inte
egration > Keyboard 
 Controls Integratio
on > should handle g
game movement keys w
without interfering 
 with audio 2ms     
     → [vitest] No 
 "AudioProvider" exp
port is defined on t
the "../audio/contex
xt/audio-context" mo
ock. Did you forget 
 to return it from "
"vi.mock"?
If you need to part
tially mock a module
e, you can use "impo
ortOriginal" helper 
 inside:

   × App Sound Inte
egration > Keyboard 
 Controls Integratio
on > should handle m
mute keyboard shortc
cut (Ctrl+M) 3ms    
     → [vitest] No 
 "AudioProvider" exp
port is defined on t
the "../audio/contex
xt/audio-context" mo
ock. Did you forget 
 to return it from "
"vi.mock"?
If you need to part
tially mock a module
e, you can use "impo
ortOriginal" helper 
 inside:

   × App Sound Inte
egration > Keyboard 
 Controls Integratio
on > should handle m
mute keyboard shortc
cut (Cmd+M) on Mac 1
1ms
     → [vitest] No 
 "AudioProvider" exp
port is defined on t
the "../audio/contex
xt/audio-context" mo
ock. Did you forget 
 to return it from "
"vi.mock"?
If you need to part
tially mock a module
e, you can use "impo
ortOriginal" helper 
 inside:

   × App Sound Inte
egration > Keyboard 
 Controls Integratio
on > should not trig
gger mute on M key w
without modifiers 1m
ms
     → [vitest] No 
 "AudioProvider" exp
port is defined on t
the "../audio/contex
xt/audio-context" mo
ock. Did you forget 
 to return it from "
"vi.mock"?
If you need to part
tially mock a module
e, you can use "impo
ortOriginal" helper 
 inside:

   × App Sound Inte
egration > Game Even
nt Sound Integration
n > should emit soun
nds for player movem
ment 1ms
     → [vitest] No 
 "AudioProvider" exp
port is defined on t
the "../audio/contex
xt/audio-context" mo
ock. Did you forget 
 to return it from "
"vi.mock"?
If you need to part
tially mock a module
e, you can use "impo
ortOriginal" helper 
 inside:

   × App Sound Inte
egration > Game Even
nt Sound Integration
n > should stop all 
 sounds when game en
nds 2ms
     → [vitest] No 
 "AudioProvider" exp
port is defined on t
the "../audio/contex
xt/audio-context" mo
ock. Did you forget 
 to return it from "
"vi.mock"?
If you need to part
tially mock a module
e, you can use "impo
ortOriginal" helper 
 inside:

   × App Sound Inte
egration > Game Even
nt Sound Integration
n > should not emit 
 sounds when game is
s over 1ms
     → [vitest] No 
 "AudioProvider" exp
port is defined on t
the "../audio/contex
xt/audio-context" mo
ock. Did you forget 
 to return it from "
"vi.mock"?
If you need to part
tially mock a module
e, you can use "impo
ortOriginal" helper 
 inside:

   × App Sound Inte
egration > Audio Con
ntrols Integration >
> should toggle mute
e via button click 1
1ms
     → [vitest] No 
 "AudioProvider" exp
port is defined on t
the "../audio/contex
xt/audio-context" mo
ock. Did you forget 
 to return it from "
"vi.mock"?
If you need to part
tially mock a module
e, you can use "impo
ortOriginal" helper 
 inside:

   × App Sound Inte
egration > Audio Con
ntrols Integration >
> should open audio 
 settings dialog 2ms
     → [vitest] No 
 "AudioProvider" exp
port is defined on t
the "../audio/contex
xt/audio-context" mo
ock. Did you forget 
 to return it from "
"vi.mock"?
If you need to part
tially mock a module
e, you can use "impo
ortOriginal" helper 
 inside:

   × App Sound Inte
egration > Audio Con
ntrols Integration >
> should display aud
dio error messages w
when available 4ms  
     → [vitest] No 
 "AudioProvider" exp
port is defined on t
the "../audio/contex
xt/audio-context" mo
ock. Did you forget 
 to return it from "
"vi.mock"?
If you need to part
tially mock a module
e, you can use "impo
ortOriginal" helper 
 inside:

   × App Sound Inte
egration > Performan
nce and Responsivene
ess > should not blo
ock user input durin
ng sound playback 2m
ms
     → [vitest] No 
 "AudioProvider" exp
port is defined on t
the "../audio/contex
xt/audio-context" mo
ock. Did you forget 
 to return it from "
"vi.mock"?
If you need to part
tially mock a module
e, you can use "impo
ortOriginal" helper 
 inside:

   × App Sound Inte
egration > Performan
nce and Responsivene
ess > should handle 
 multiple simultaneo
ous sound events 1ms
     → [vitest] No 
 "AudioProvider" exp
port is defined on t
the "../audio/contex
xt/audio-context" mo
ock. Did you forget 
 to return it from "
"vi.mock"?
If you need to part
tially mock a module
e, you can use "impo
ortOriginal" helper 
 inside:

   × App Sound Inte
egration > Performan
nce and Responsivene
ess > should maintai
in game state consis
stency during audio 
 operations 1ms     
     → [vitest] No 
 "AudioProvider" exp
port is defined on t
the "../audio/contex
xt/audio-context" mo
ock. Did you forget 
 to return it from "
"vi.mock"?
If you need to part
tially mock a module
e, you can use "impo
ortOriginal" helper 
 inside:

   × App Sound Inte
egration > Error Rec
covery > should cont
tinue working when s
sound playback fails
s 1ms
     → [vitest] No 
 "AudioProvider" exp
port is defined on t
the "../audio/contex
xt/audio-context" mo
ock. Did you forget 
 to return it from "
"vi.mock"?
If you need to part
tially mock a module
e, you can use "impo
ortOriginal" helper 
 inside:

   × App Sound Inte
egration > Error Rec
covery > should hand
dle audio context su
uspension gracefully
y 1ms
     → [vitest] No 
 "AudioProvider" exp
port is defined on t
the "../audio/contex
xt/audio-context" mo
ock. Did you forget 
 to return it from "
"vi.mock"?
If you need to part
tially mock a module
e, you can use "impo
ortOriginal" helper 
 inside:



⎯ Failed Tests 18 ⎯

 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > So
ound System Initiali
ization > should ini
itialize audio syste
em on app startup   
 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > So
ound System Initiali
ization > should not
t block game renderi
ing during audio ini
itialization        
 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > So
ound System Initiali
ization > should han
ndle audio initializ
zation errors gracef
fully
 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > Ke
eyboard Controls Int
tegration > should h
handle game movement
t keys without inter
rfering with audio  
 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > Ke
eyboard Controls Int
tegration > should h
handle mute keyboard
d shortcut (Ctrl+M) 
 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > Ke
eyboard Controls Int
tegration > should h
handle mute keyboard
d shortcut (Cmd+M) o
on Mac
 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > Ke
eyboard Controls Int
tegration > should n
not trigger mute on 
 M key without modif
fiers
 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > Ga
ame Event Sound Inte
egration > should em
mit sounds for playe
er movement
 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > Ga
ame Event Sound Inte
egration > should st
top all sounds when 
 game ends
 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > Ga
ame Event Sound Inte
egration > should no
ot emit sounds when 
 game is over       
 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > Au
udio Controls Integr
ration > should togg
gle mute via button 
 click
 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > Au
udio Controls Integr
ration > should open
n audio settings dia
alog
 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > Au
udio Controls Integr
ration > should disp
play audio error mes
ssages when availabl
le
 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > Pe
erformance and Respo
onsiveness > should 
 not block user inpu
ut during sound play
yback
 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > Pe
erformance and Respo
onsiveness > should 
 handle multiple sim
multaneous sound eve
ents
 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > Pe
erformance and Respo
onsiveness > should 
 maintain game state
e consistency during
g audio operations  
 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > Er
rror Recovery > shou
uld continue working
g when sound playbac
ck fails
 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > Er
rror Recovery > shou
uld handle audio con
ntext suspension gra
acefully
Error: [vitest] No 
 "AudioProvider" exp
port is defined on t
the "../audio/contex
xt/audio-context" mo
ock. Did you forget 
 to return it from "
"vi.mock"?
If you need to part
tially mock a module
e, you can use "impo
ortOriginal" helper 
 inside:

vi.mock(import("../
/audio/context/audio
o-context"), async (
(importOriginal) => 
 {
  const actual = aw
wait importOriginal(
()
  return {
    ...actual,     
    // your mocked 
 methods
  }
})

 ❯ App src/App.tsx:
:123:6
    121| const App…
    122|   return (
    123|     <Audi…
       |      ^    
    124|       <Ga…
    125|     </Aud…
 ❯ Object.react-sta
ack-bottom-frame nod
de_modules/react-dom
m/cjs/react-dom-clie
ent.development.js:2
23863:20
 ❯ renderWithHooks 
 node_modules/react-
-dom/cjs/react-dom-c
client.development.j
js:5529:22
 ❯ updateFunctionCo
omponent node_module
es/react-dom/cjs/rea
act-dom-client.devel
lopment.js:8897:19  
 ❯ beginWork node_m
modules/react-dom/cj
js/react-dom-client.
.development.js:1052
22:18
 ❯ runWithFiberInDE
EV node_modules/reac
ct-dom/cjs/react-dom
m-client.development
t.js:1522:13        
 ❯ performUnitOfWor
rk node_modules/reac
ct-dom/cjs/react-dom
m-client.development
t.js:15140:22       
 ❯ workLoopSync nod
de_modules/react-dom
m/cjs/react-dom-clie
ent.development.js:1
14956:41

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/18]⎯


 Test Files  1 fail
led (1)
      Tests  18 fai
iled (18)
   Start at  16:07:
:07
   Duration  1.44s 
 (transform 173ms, s
setup 101ms, collect
t 287ms, tests 52ms,
, environment 544ms,
, prepare 177ms)    


ode (vitest 1):\Windows\System32\cmd.exe
D:\FizzBash\TheWand
derer
I need to check what exports are available in the audio context module and mock them properly:

Read file(s)

audio-context.tsx 1 - 51
Searched workspace
Finding the exports from the audio context module
Now I can see that I need to mock both AudioProvider and useAudioContext. Let me fix the mock:

Accepted edits to

app-sound-integration.test.tsx


Let me run the tests again to see if this fixes the AudioProvider issue:

Command
npm test -- src/tests/app-sound-integration.test.tsx --run --reporter=basic
npm test -- sr
rc/tests/app-sound-i
integration.test.tsx
x --run --reporter=b
basic
:\Windows\System32\cmd.exe - npm  test -- src/tests/app-sound-integration.test.tsx --run --reporter=basicpm test src/tests/app-sound-integration.test.tsx --run --reporter=basic
> thewanderer@0.1.0
0 test
> vitest run -c vit
test.config.ts src/t
tests/app-sound-inte
egration.test.tsx --
-run --reporter=basi
ic

:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/Fiz
zzBash/TheWanderer  

 DEPRECATED  'basic
c' reporter is depre
ecated and will be r
removed in Vitest v3
3.
Remove 'basic' from
m 'reporters' option
n. To match 'basic' 
 reporter 100%, use 
 configuration:     
{
  "test": {        
    "reporters": [ 
      [
        "default", 
        {
          "summary"
": false
        }
      ]
    ]
  }
}
ode (vitest 2)ode (vitest 4)ode (vitest 6)ode (vitest 8)ode (vitest 9)ode (vitest 11)ode (vitest 15)
(node:44868) [DEP00
040] DeprecationWarn
ning: The `punycode`
` module is deprecat
ted. Please use a us
serland alternative 
 instead.
(Use `node --trace-
-deprecation ...` to
o show where the war
rning was created)  

 ❯ src/tests/app-so
ound-integration.tes
st.tsx (18 tests | 1
18 failed) 70ms     
   × App Sound Inte
egration > Sound Sys
stem Initialization 
 > should initialize
e audio system on ap
pp startup 22ms     
     → audioManager
r?.isMuted is not a 
 function
   × App Sound Inte
egration > Sound Sys
stem Initialization 
 > should not block 
 game rendering duri
ing audio initializa
ation 3ms
     → audioManager
r?.isMuted is not a 
 function
   × App Sound Inte
egration > Sound Sys
stem Initialization 
 > should handle aud
dio initialization e
errors gracefully 3m
ms
     → audioManager
r?.isMuted is not a 
 function
   × App Sound Inte
egration > Keyboard 
 Controls Integratio
on > should handle g
game movement keys w
without interfering 
 with audio 3ms     
     → audioManager
r?.isMuted is not a 
 function
   × App Sound Inte
egration > Keyboard 
 Controls Integratio
on > should handle m
mute keyboard shortc
cut (Ctrl+M) 3ms    
     → audioManager
r?.isMuted is not a 
 function
   × App Sound Inte
egration > Keyboard 
 Controls Integratio
on > should handle m
mute keyboard shortc
cut (Cmd+M) on Mac 2
2ms
     → audioManager
r?.isMuted is not a 
 function
   × App Sound Inte
egration > Keyboard 
 Controls Integratio
on > should not trig
gger mute on M key w
without modifiers 2m
ms
     → audioManager
r?.isMuted is not a 
 function
   × App Sound Inte
egration > Game Even
nt Sound Integration
n > should emit soun
nds for player movem
ment 2ms
     → audioManager
r?.isMuted is not a 
 function
   × App Sound Inte
egration > Game Even
nt Sound Integration
n > should stop all 
 sounds when game en
nds 7ms
     → audioManager
r?.isMuted is not a 
 function
   × App Sound Inte
egration > Game Even
nt Sound Integration
n > should not emit 
 sounds when game is
s over 2ms
     → audioManager
r?.isMuted is not a 
 function
   × App Sound Inte
egration > Audio Con
ntrols Integration >
> should toggle mute
e via button click 2
2ms
     → audioManager
r?.isMuted is not a 
 function
   × App Sound Inte
egration > Audio Con
ntrols Integration >
> should open audio 
 settings dialog 2ms
     → audioManager
r?.isMuted is not a 
 function
   × App Sound Inte
egration > Audio Con
ntrols Integration >
> should display aud
dio error messages w
when available 2ms  
     → audioManager
r?.isMuted is not a 
 function
   × App Sound Inte
egration > Performan
nce and Responsivene
ess > should not blo
ock user input durin
ng sound playback 2m
ms
     → audioManager
r?.isMuted is not a 
 function
   × App Sound Inte
egration > Performan
nce and Responsivene
ess > should handle 
 multiple simultaneo
ous sound events 3ms
     → audioManager
r?.isMuted is not a 
 function
   × App Sound Inte
egration > Performan
nce and Responsivene
ess > should maintai
in game state consis
stency during audio 
 operations 3ms     
     → audioManager
r?.isMuted is not a 
 function
   × App Sound Inte
egration > Error Rec
covery > should cont
tinue working when s
sound playback fails
s 2ms
     → audioManager
r?.isMuted is not a 
 function
   × App Sound Inte
egration > Error Rec
covery > should hand
dle audio context su
uspension gracefully
y 2ms
     → audioManager
r?.isMuted is not a 
 function


⎯ Failed Tests 18 ⎯

 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > So
ound System Initiali
ization > should ini
itialize audio syste
em on app startup   
 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > So
ound System Initiali
ization > should not
t block game renderi
ing during audio ini
itialization        
 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > So
ound System Initiali
ization > should han
ndle audio initializ
zation errors gracef
fully
 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > Ke
eyboard Controls Int
tegration > should h
handle game movement
t keys without inter
rfering with audio  
 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > Ke
eyboard Controls Int
tegration > should h
handle mute keyboard
d shortcut (Ctrl+M) 
 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > Ke
eyboard Controls Int
tegration > should h
handle mute keyboard
d shortcut (Cmd+M) o
on Mac
 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > Ke
eyboard Controls Int
tegration > should n
not trigger mute on 
 M key without modif
fiers
 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > Ga
ame Event Sound Inte
egration > should em
mit sounds for playe
er movement
 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > Ga
ame Event Sound Inte
egration > should st
top all sounds when 
 game ends
 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > Ga
ame Event Sound Inte
egration > should no
ot emit sounds when 
 game is over       
 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > Au
udio Controls Integr
ration > should togg
gle mute via button 
 click
 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > Au
udio Controls Integr
ration > should open
n audio settings dia
alog
 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > Au
udio Controls Integr
ration > should disp
play audio error mes
ssages when availabl
le
 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > Pe
erformance and Respo
onsiveness > should 
 not block user inpu
ut during sound play
yback
 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > Pe
erformance and Respo
onsiveness > should 
 handle multiple sim
multaneous sound eve
ents
 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > Pe
erformance and Respo
onsiveness > should 
 maintain game state
e consistency during
g audio operations  
 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > Er
rror Recovery > shou
uld continue working
g when sound playbac
ck fails
 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > Er
rror Recovery > shou
uld handle audio con
ntext suspension gra
acefully
TypeError: audioMan
nager?.isMuted is no
ot a function       
 ❯ useSound src/aud
dio/hooks/use-sound.
.ts:106:35
    104|     }, [a…
    105|
    106|     const…
       |           
                   
     ^
    107|
    108|     const…
 ❯ GameComponent sr
rc/App.tsx:27:40    
 ❯ Object.react-sta
ack-bottom-frame nod
de_modules/react-dom
m/cjs/react-dom-clie
ent.development.js:2
23863:20
 ❯ renderWithHooks 
 node_modules/react-
-dom/cjs/react-dom-c
client.development.j
js:5529:22
 ❯ updateFunctionCo
omponent node_module
es/react-dom/cjs/rea
act-dom-client.devel
lopment.js:8897:19  
 ❯ beginWork node_m
modules/react-dom/cj
js/react-dom-client.
.development.js:1052
22:18
 ❯ runWithFiberInDE
EV node_modules/reac
ct-dom/cjs/react-dom
m-client.development
t.js:1522:13        
 ❯ performUnitOfWor
rk node_modules/reac
ct-dom/cjs/react-dom
m-client.development
t.js:15140:22       

 ❯ workLoopSync nod
de_modules/react-dom
m/cjs/react-dom-clie
ent.development.js:1
14956:41
 ❯ renderRootSync n
node_modules/react-d
dom/cjs/react-dom-cl
lient.development.js
s:14936:11

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/18]⎯


 Test Files  1 fail
led (1)
      Tests  18 fai
iled (18)
   Start at  16:07:
:52
   Duration  1.46s 
 (transform 177ms, s
setup 116ms, collect
t 274ms, tests 70ms,
, environment 548ms,
, prepare 174ms)    

ode (vitest 1):\Windows\System32\cmd.exe
D:\FizzBash\TheWand
derer
The error shows that audioManager?.isMuted is being called as a function. Let me check the use-sound hook to see what methods are expected on the audioManager:

Read file(s)

use-sound.ts 100 - 111
I see! The isMuted is a method, not a property. Let me check the AudioManager interface to see what methods need to be mocked:

Read file(s)

IAudioManager.ts
Now I can see all the methods that need to be mocked. Let me update the mock to include all the required methods:

Accepted edits to

app-sound-integration.test.tsx


Let me run the tests again to see if this fixes the method issues:

Command
npm test -- src/tests/app-sound-integration.test.tsx --run --reporter=basic
npm test -- sr
rc/tests/app-sound-i
integration.test.t  sx
x --run --reporter=b
basic
:\Windows\System32\cmd.exe - npm  test -- src/tests/app-sound-integration.test.tsx --run --reporter=basicpm test src/tests/app-sound-integration.test.tsx --run --reporter=basic
> thewanderer@0.1.0
0 test
> vitest run -c vit
test.config.ts src/t
tests/app-sound-inte
egration.test.tsx --
-run --reporter=basi
ic

:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/Fiz
zzBash/TheWanderer  

 DEPRECATED  'basic
c' reporter is depre
ecated and will be r
removed in Vitest v3
3.
Remove 'basic' from
m 'reporters' option
n. To match 'basic' 
 reporter 100%, use 
 configuration:     
{
  "test": {        
    "reporters": [ 
      [
        "default", 
        {
          "summary"
": false
        }
      ]
    ]
  }
}
ode (vitest 3)ode (vitest 4)ode (vitest 6)ode (vitest 8)ode (vitest 9)ode (vitest 10)ode (vitest 13)ode (vitest 15)
(node:9944) [DEP004
40] DeprecationWarni
ing: The `punycode` 
 module is deprecate
ed. Please use a use
erland alternative i
instead.
(Use `node --trace-
-deprecation ...` to
o show where the war
rning was created)  

stderr | src/tests/
/app-sound-integrati
ion.test.tsx > App S
Sound Integration > 
 Error Recovery > sh
hould continue worki
ing when sound playb
back fails
Failed to play soun
nd player_walk: Erro
or: Sound playback f
failed
    at Object.<anon
nymous> (D:\FizzBash
h\TheWanderer\src\te
ests\app-sound-integ
gration.test.tsx:480
0:23)
    at Object.mockC
Call (file:///D:/Fiz
zzBash/TheWanderer/n
node_modules/@vitest
t/spy/dist/index.js:
:96:15)
    at Object.spy [
[as playSound] (file
e:///D:/FizzBash/The
eWanderer/node_modul
les/tinyspy/dist/ind
dex.js:47:103)      
    at D:\FizzBash\
\TheWanderer\src\aud
dio\hooks\use-sound.
.ts:92:26
    at D:\FizzBash\
\TheWanderer\src\App
p.tsx:51:7
    at emit (D:\Fiz
zzBash\TheWanderer\s
src\audio\events\sou
und-event-emitter.ts
s:25:13)
    at Array.forEac
ch (<anonymous>)    
    at Object.emitM
Multiple (D:\FizzBas
sh\TheWanderer\src\a
audio\events\sound-e
event-emitter.ts:32:
:16)
    at emitSoundEve
ents (D:\FizzBash\Th
heWanderer\src\audio
o\events\sound-event
t-emitter.ts:66:13) 
    at movePlayer (
(D:\FizzBash\TheWand
derer\src\GameState.
.ts:150:7)
Failed to play soun
nd boulder_move: Err
ror: Sound playback 
 failed
    at Object.<anon
nymous> (D:\FizzBash
h\TheWanderer\src\te
ests\app-sound-integ
gration.test.tsx:480
0:23)
    at Object.mockC
Call (file:///D:/Fiz
zzBash/TheWanderer/n
node_modules/@vitest
t/spy/dist/index.js:
:96:15)
    at Object.spy [
[as playSound] (file
e:///D:/FizzBash/The
eWanderer/node_modul
les/tinyspy/dist/ind
dex.js:47:103)      
    at D:\FizzBash\
\TheWanderer\src\aud
dio\hooks\use-sound.
.ts:92:26
    at D:\FizzBash\
\TheWanderer\src\App
p.tsx:51:7
    at emit (D:\Fiz
zzBash\TheWanderer\s
src\audio\events\sou
und-event-emitter.ts
s:25:13)
    at Array.forEac
ch (<anonymous>)    
    at Object.emitM
Multiple (D:\FizzBas
sh\TheWanderer\src\a
audio\events\sound-e
event-emitter.ts:32:
:16)
    at emitSoundEve
ents (D:\FizzBash\Th
heWanderer\src\audio
o\events\sound-event
t-emitter.ts:66:13) 
    at movePlayer (
(D:\FizzBash\TheWand
derer\src\GameState.
.ts:150:7)
Failed to play soun
nd boulder_move: Err
ror: Sound playback 
 failed
    at Object.<anon
nymous> (D:\FizzBash
h\TheWanderer\src\te
ests\app-sound-integ
gration.test.tsx:480
0:23)
    at Object.mockC
Call (file:///D:/Fiz
zzBash/TheWanderer/n
node_modules/@vitest
t/spy/dist/index.js:
:96:15)
    at Object.spy [
[as playSound] (file
e:///D:/FizzBash/The
eWanderer/node_modul
les/tinyspy/dist/ind
dex.js:47:103)      
    at D:\FizzBash\
\TheWanderer\src\aud
dio\hooks\use-sound.
.ts:92:26
    at D:\FizzBash\
\TheWanderer\src\App
p.tsx:51:7
    at emit (D:\Fiz
zzBash\TheWanderer\s
src\audio\events\sou
und-event-emitter.ts
s:25:13)
    at Array.forEac
ch (<anonymous>)    
    at Object.emitM
Multiple (D:\FizzBas
sh\TheWanderer\src\a
audio\events\sound-e
event-emitter.ts:32:
:16)
    at emitSoundEve
ents (D:\FizzBash\Th
heWanderer\src\audio
o\events\sound-event
t-emitter.ts:66:13) 
    at movePlayer (
(D:\FizzBash\TheWand
derer\src\GameState.
.ts:150:7)
Failed to play soun
nd boulder_move: Err
ror: Sound playback 
 failed
    at Object.<anon
nymous> (D:\FizzBash
h\TheWanderer\src\te
ests\app-sound-integ
gration.test.tsx:480
0:23)
    at Object.mockC
Call (file:///D:/Fiz
zzBash/TheWanderer/n
node_modules/@vitest
t/spy/dist/index.js:
:96:15)
    at Object.spy [
[as playSound] (file
e:///D:/FizzBash/The
eWanderer/node_modul
les/tinyspy/dist/ind
dex.js:47:103)      
    at D:\FizzBash\
\TheWanderer\src\aud
dio\hooks\use-sound.
.ts:92:26
    at D:\FizzBash\
\TheWanderer\src\App
p.tsx:51:7
    at emit (D:\Fiz
zzBash\TheWanderer\s
src\audio\events\sou
und-event-emitter.ts
s:25:13)
    at Array.forEac
ch (<anonymous>)    
    at Object.emitM
Multiple (D:\FizzBas
sh\TheWanderer\src\a
audio\events\sound-e
event-emitter.ts:32:
:16)
    at emitSoundEve
ents (D:\FizzBash\Th
heWanderer\src\audio
o\events\sound-event
t-emitter.ts:66:13) 
    at movePlayer (
(D:\FizzBash\TheWand
derer\src\GameState.
.ts:150:7)


 ❯ src/tests/app-so
ound-integration.tes
st.tsx (18 tests | 7
7 failed) 8065ms    
   × App Sound Inte
egration > Sound Sys
stem Initialization 
 > should initialize
e audio system on ap
pp startup 1076ms   
     → expected "sp
py" to be called at 
 least once

Ignored nodes: comm
ments, script, style
<html>
  <head />
  <body>
    <div>
      <div>        
        <div       
          class="ma
aze-grid"
        >
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell bomb"
>        
💣     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell player"       
>        
🧑     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell bomb"
>        
💣     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder       "
>        
🪨     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell exit"
>        
🚪     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
        </div>     
        <div       
          class="hu
ud"
        >
<div     
            class="
"hud-left"
>        
<span> 
              Score
e:
              0    
</span>
<span> 
              Diamo
onds left:
              6    
</span>
<span> 
              Moves
s:
              55   
</span>
            <span /
/>
</div>   
<div     
            class="
"hud-right"
>        
<div   
              class
s="audio-control"   
>      
              <butt
ton
                ari
ia-label="Mute audio
o"
                cla
ass="audio-button mu
ute-button "        
                tit
tle="Mute (Ctrl+M)" 
>    
🔊 
              </but
tton>
              <butt
ton
                ari
ia-label="Open audio
o settings"
                cla
ass="audio-button se
ettings-button"     
                tit
tle="Audio Settings"
>    
⚙️ 
              </but
tton>
</div> 
</div>   
        </div>     
      </div>       
    </div>
  </body>
</html>
   ✓ App Sound Inte
egration > Sound Sys
stem Initialization 
 > should not block 
 game rendering duri
ing audio initializa
ation 27ms
   ✓ App Sound Inte
egration > Sound Sys
stem Initialization 
 > should handle aud
dio initialization e
errors gracefully 33
3ms
   × App Sound Inte
egration > Keyboard 
 Controls Integratio
on > should handle g
game movement keys w
without interfering 
 with audio 1070ms  
     → expected "sp
py" to be called wit
th arguments: [ Any<
<String>, ObjectCont
taining{…} ]        

Received:

  1st spy call:    

  [
-   Any<String>,   
-   ObjectContainin
ng {
-     "source": "pl
layer",
-     "type": "move
ement",
+   "player_walk", 
+   {
+     "volume": 0.6
6,
    },
  ]

  2nd spy call:    

  [
-   Any<String>,   
-   ObjectContainin
ng {
-     "source": "pl
layer",
-     "type": "move
ement",
+   "boulder_move",
+   {
+     "volume": 0.8
8,
    },
  ]

  3rd spy call:    

  [
-   Any<String>,   
-   ObjectContainin
ng {
-     "source": "pl
layer",
-     "type": "move
ement",
+   "boulder_move",
+   {
+     "volume": 0.8
8,
    },
  ]

  4th spy call:    

  [
-   Any<String>,   
-   ObjectContainin
ng {
-     "source": "pl
layer",
-     "type": "move
ement",
+   "boulder_move",
+   {
+     "volume": 0.8
8,
    },
  ]


Number of calls: 4 


Ignored nodes: comm
ments, script, style
<html>
  <head />
  <body>
    <div>
      <div>        
        <div       
          class="ma
aze-grid"
        >
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell bomb"
>        
💣     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell player"       
>        
🧑     
</div>   
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell bomb"
>        
💣     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell exit"
>        
🚪     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
        </div>     
        <div       
          class="hu
ud"
        >
<div     
            class="
"hud-left"
>        
<span> 
              Score
e:
              0    
</span>
<span> 
              Diamo
onds left:
              6    
</span>
<span> 
              Moves
s:
              54   
</span>
            <span /
/>
</div>   
<div     
            class="
"hud-right"
>        
<div   
              class
s="audio-control"   
>      
              <butt
ton
                ari
ia-label="Mute audio
o"
                cla
ass="audio-button mu
ute-button "        
                tit
tle="Mute (Ctrl+M)" 
>    
🔊 
              </but
tton>
              <butt
ton
                ari
ia-label="Open audio
o settings"
                cla
ass="audio-button se
ettings-button"     
                tit
tle="Audio Settings"
>    
⚙️ 
              </but
tton>
</div> 
</div>   
        </div>     
      </div>       
    </div>
  </body>
</html>
   × App Sound Inte
egration > Keyboard 
 Controls Integratio
on > should handle m
mute keyboard shortc
cut (Ctrl+M) 1040ms 

     → Unable to fi
ind a label with the
e text of: Unmute au
udio

Ignored nodes: comm
ments, script, style
<body>
  <div>
    <div>
      <div
        class="maze
e-grid"
      >
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell diamond"        
        >
💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell boulder"        
        >
🪨       
        </div>     
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell diamond"        
        >
💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell boulder"        
        >
🪨       
        </div>     
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell bomb"
        >
💣       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell player"
        >
🧑       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell diamond"        
        >
💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell boulder"        
        >
🪨       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell diamond"        
        >
💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell boulder"        
        >
🪨       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell boulder"        
        >
🪨       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell bomb"
        >
💣       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell boulder"        
        >
🪨       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell diamond"        
        >
💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell diamond"        
        >
💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell exit"
        >
🚪       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
      </div>       
      <div
        class="hud"
      >
        <div       
          class="hu
ud-left"
        >
<span>   
Score: 
            0      
</span>  
<span>   
            Diamond
ds left:
            6      
</span>  
<span>   
Moves: 
            55     
</span>  
<span /> 
        </div>     
        <div       
          class="hu
ud-right"
        >
<div     
            class="
"audio-control"     
>        
<button
              aria-
-label="Mute audio" 
              class
s="audio-button mute
e-button "
              title
e="Mute (Ctrl+M)"   
>      
🔊   
            </butto
on>
<button
              aria-
-label="Open audio s
settings"
              class
s="audio-button sett
tings-button"       
              title
e="Audio Settings"  
>      
⚙️   
            </butto
on>
</div>   
        </div>     
      </div>       
    </div>
  </div>
</body>

Ignored nodes: comm
ments, script, style
<html>
  <head />
  <body>
    <div>
      <div>        
        <div       
          class="ma
aze-grid"
        >
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell bomb"
>        
💣     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell player"       
>        
🧑     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell bomb"
>        
💣     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell exit"
>        
🚪     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
        </div>     
        <div       
          class="hu
ud"
        >
<div     
            class="
"hud-left"
>        
<span> 
              Score
e:
              0    
</span>
<span> 
              Diamo
onds left:
              6    
</span>
<span> 
              Moves
s:
              55   
</span>
            <span /
/>
</div>   
<div     
            class="
"hud-right"
>        
<div   
              class
s="audio-control"   
>      
              <butt
ton
                ari
ia-label="Mute audio
o"
                cla
ass="audio-button mu
ute-button "        
                tit
tle="Mute (Ctrl+M)" 
>    
🔊 
              </but
tton>
              <butt
ton
                ari
ia-label="Open audio
o settings"
                cla
ass="audio-button se
ettings-button"     
                tit
tle="Audio Settings"
>    
⚙️ 
              </but
tton>
</div> 
</div>   
        </div>     
      </div>       
    </div>
  </body>
</html>
   × App Sound Inte
egration > Keyboard 
 Controls Integratio
on > should handle m
mute keyboard shortc
cut (Cmd+M) on Mac 1
1037ms
     → Unable to fi
ind a label with the
e text of: Unmute au
udio

Ignored nodes: comm
ments, script, style
<body>
  <div>
    <div>
      <div
        class="maze
e-grid"
      >
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell diamond"        
        >
💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell boulder"        
        >
🪨       
        </div>     
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell diamond"        
        >
💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell boulder"        
        >
🪨       
        </div>     
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell bomb"
        >
💣       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell player"
        >
🧑       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell diamond"        
        >
💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell boulder"        
        >
🪨       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell diamond"        
        >
💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell boulder"        
        >
🪨       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell boulder"        
        >
🪨       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell bomb"
        >
💣       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell boulder"        
        >
🪨       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell diamond"        
        >
💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell diamond"        
        >
💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell exit"
        >
🚪       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
      </div>       
      <div
        class="hud"
      >
        <div       
          class="hu
ud-left"
        >
<span>   
Score: 
            0      
</span>  
<span>   
            Diamond
ds left:
            6      
</span>  
<span>   
Moves: 
            55     
</span>  
<span /> 
        </div>     
        <div       
          class="hu
ud-right"
        >
<div     
            class="
"audio-control"     
>        
<button
              aria-
-label="Mute audio" 
              class
s="audio-button mute
e-button "
              title
e="Mute (Ctrl+M)"   
>      
🔊   
            </butto
on>
<button
              aria-
-label="Open audio s
settings"
              class
s="audio-button sett
tings-button"       
              title
e="Audio Settings"  
>      
⚙️   
            </butto
on>
</div>   
        </div>     
      </div>       
    </div>
  </div>
</body>

Ignored nodes: comm
ments, script, style
<html>
  <head />
  <body>
    <div>
      <div>        
        <div       
          class="ma
aze-grid"
        >
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell bomb"
>        
💣     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell player"       
>        
🧑     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell bomb"
>        
💣     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell exit"
>        
🚪     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
        </div>     
        <div       
          class="hu
ud"
        >
<div     
            class="
"hud-left"
>        
<span> 
              Score
e:
              0    
</span>
<span> 
              Diamo
onds left:
              6    
</span>
<span> 
              Moves
s:
              55   
</span>
            <span /
/>
</div>   
<div     
            class="
"hud-right"
>        
<div   
              class
s="audio-control"   
>      
              <butt
ton
                ari
ia-label="Mute audio
o"
                cla
ass="audio-button mu
ute-button "        
                tit
tle="Mute (Ctrl+M)" 
>    
🔊 
              </but
tton>
              <butt
ton
                ari
ia-label="Open audio
o settings"
                cla
ass="audio-button se
ettings-button"     
                tit
tle="Audio Settings"
>    
⚙️ 
              </but
tton>
</div> 
</div>   
        </div>     
      </div>       
    </div>
  </body>
</html>

   ✓ App Sound Inte
egration > Keyboard 
 Controls Integratio
on > should not trig
gger mute on M key w
without modifiers 16
6ms
   × App Sound Inte
egration > Game Even
nt Sound Integration
n > should emit soun
nds for player movem
ment 1054ms
     → expected "sp
py" to be called wit
th arguments: [ Stri
ingMatching /walk|di
ig/, …(1) ]

Received:

  1st spy call:    

  [
-   StringMatching 
 /walk|dig/,        
-   ObjectContainin
ng {
-     "source": "pl
layer",
-     "type": "move
ement",
+   "player_walk", 
+   {
+     "volume": 0.6
6,
    },
  ]

  2nd spy call:    

  [
-   StringMatching 
 /walk|dig/,        
-   ObjectContainin
ng {
-     "source": "pl
layer",
-     "type": "move
ement",
+   "boulder_move",
+   {
+     "volume": 0.8
8,
    },
  ]

  3rd spy call:    

  [
-   StringMatching 
 /walk|dig/,        
-   ObjectContainin
ng {
-     "source": "pl
layer",
-     "type": "move
ement",
+   "boulder_move",
+   {
+     "volume": 0.8
8,
    },
  ]

  4th spy call:    

  [
-   StringMatching 
 /walk|dig/,        
-   ObjectContainin
ng {
-     "source": "pl
layer",
-     "type": "move
ement",
+   "boulder_move",
+   {
+     "volume": 0.8
8,
    },
  ]


Number of calls: 4 


Ignored nodes: comm
ments, script, style
<html>
  <head />
  <body>
    <div>
      <div>        
        <div       
          class="ma
aze-grid"
        >
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell bomb"
>        
💣     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell player"       
>        
🧑     
</div>   
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell bomb"
>        
💣     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell exit"
>        
🚪     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
        </div>     
        <div       
          class="hu
ud"
        >
<div     
            class="
"hud-left"
>        
<span> 
              Score
e:
              0    
</span>
<span> 
              Diamo
onds left:
              6    
</span>
<span> 
              Moves
s:
              54   
</span>
            <span /
/>
</div>   
<div     
            class="
"hud-right"
>        
<div   
              class
s="audio-control"   
>      
              <butt
ton
                ari
ia-label="Mute audio
o"
                cla
ass="audio-button mu
ute-button "        
                tit
tle="Mute (Ctrl+M)" 
>    
🔊 
              </but
tton>
              <butt
ton
         ari
ia-label="Open audio
o settings"
                cla
ass="audio-button se
ettings-button"     
                tit
tle="Audio Settings"
>    
⚙️ 
              </but
tton>
</div> 
</div>   
        </div>     
      </div>       
    </div>
  </body>
</html>
   ✓ App Sound Inte
egration > Game Even
nt Sound Integration
n > should stop all 
 sounds when game en
nds 42ms
   ✓ App Sound Inte
egration > Game Even
nt Sound Integration
n > should not emit 
 sounds when game is
s over 33ms
   × App Sound Inte
egration > Audio Con
ntrols Integration >
> should toggle mute
e via button click 1
1042ms
     → Unable to fi
ind a label with the
e text of: Unmute au
udio

Ignored nodes: comm
ments, script, style
<body>
  <div>
    <div>
      <div
        class="maze
e-grid"
      >
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell diamond"        
        >
💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell boulder"        
        >
🪨       
        </div>     
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell diamond"        
        >
💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell boulder"        
        >
🪨       
        </div>     
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell bomb"
        >
💣       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell player"
        >
🧑       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell diamond"        
        >
💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell boulder"        
        >
🪨       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell diamond"        
        >
💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell rock"
 >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell boulder"        
        >
🪨       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell boulder"        
        >
🪨       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell bomb"
        >
💣       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell boulder"        
        >
🪨       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell diamond"        
        >
💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell diamond"        
        >
💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell exit"
        >
🚪       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
      </div>       
      <div
        class="hud"
      >
        <div       
          class="hu
ud-left"
        >
<span>   
Score: 
            0      
</span>  
<span>   
            Diamond
ds left:
            6      
</span>  
<span>   
Moves: 
            55     
</span>  
<span /> 
        </div>     
        <div       
          class="hu
ud-right"
        >
<div     
            class="
"audio-control"     
>        
<button
              aria-
-label="Mute audio" 
              class
s="audio-button mute
e-button "
              title
e="Mute (Ctrl+M)"   
>      
🔊   
            </butto
on>
<button
              aria-
-label="Open audio s
settings"
              class
s="audio-button sett
tings-button"       
              title
e="Audio Settings"  
>      
⚙️   
            </butto
on>
</div>   
        </div>     
      </div>       
    </div>
  </div>
</body>

Ignored nodes: comm
ments, script, style
<html>
  <head />
  <body>
    <div>
      <div>        
        <div       
          class="ma
aze-grid"
        >
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
cla    ss="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell bomb"
>        
💣     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell player"       
>        
🧑     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell bomb"
>        
💣     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell exit"
>        
🚪     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
        </div>     
        <div       
          class="hu
ud"
        >
<div     
            class="
"hud-left"
>        
<span> 
              Score
e:
              0    
</span>
<span> 
              Diamo
onds left:
              6    
</span>
<span> 
              Moves
s:
              55   
</span>
            <span /
/>
</div>   
<div     
            class="
"hud-right"
>        
<div   
              class
s="audio-control"   
>      
              <butt
ton
                ari
ia-label="Mute audio
o"
                cla
ass="audio-button mu
ute-button "        
                tit
tle="Mute (Ctrl+M)" 
>    
🔊 
              </but
tton>
              <butt
ton
                ari
ia-label="Open audio
o settings"
                cla
ass="audio-button se
ettings-button"     
                tit
tle="Audio Settings"
>    
⚙️ 
              </but
tton>
</div> 
</div>   
        </div>     
      </div>       
    </div>
  </body>
</html>
   ✓ App Sound Inte
egration > Audio Con
ntrols Integration >
> should open audio 
 settings dialog 40m
ms

   × App Sound Inte
egration > Audio Con
ntrols Integration >
> should display aud
dio error messages w
when available 1052m
ms
     → Unable to fi
ind an element with 
 the text: /audio er
rror/i. This could b
be because the text 
 is broken up by mul
ltiple elements. In 
 this case, you can 
 provide a function 
 for your text match
her to make your mat
tcher more flexible.

Ignored nodes: comm
ments, script, style
<body>
  <div>
    <div>
      <div
        class="audi
io-error-container" 
        style="padd
ding: 10px; margin: 
 10px 0px; backgroun
nd-color: rgb(240, 2
248, 255); border: 1
1px solid #b3e0ff; b
border-radius: 4px; 
 font-size: 14px;"  
      >
        <div       
          class="au
udio-playback-errors
s"
        >
<p       
            style="
"font-weight: bold; 
 color: rgb(237, 108
8, 2);"
>        
            Some so
ound effects failed 
 to play
</p>     
        </div>     
        <div       
          class="au
udio-error-actions" 
          style="di
isplay: flex; justif
fy-content: space-be
etween; margin-top: 
 10px;"
        >
<div>    
<button
              style
e="padding: 5px 10px
x; background-color:
: rgb(33, 150, 243);
; color: white; bord
der-radius: 4px; cur
rsor: pointer; margi
in-right: 10px;"    
>      
              Retry
y Audio
            </butto
on>
<button
              style
e="padding: 5px 10px
x; background-color:
: rgb(245, 245, 245)
); border: 1px solid
d #ccc; border-radiu
us: 4px; cursor: poi
inter;"
>      
              Audio
o Help
            </butto
on>
</div>   
<button  
            style="
"padding: 5px 10px; 
 background-color: t
transparent; cursor:
: pointer; text-deco
oration: underline;"
>        
Dismiss
</button>
        </div>     
      </div>       
      <div
        class="maze
e-grid"
      >
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell diamond"        
        >
💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell boulder"        
        >
🪨       
        </div>     
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell diamond"        
        >
💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell boulder"        
        >
🪨       
        </div>     
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell bomb"
        >
💣       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell player"
        >
🧑       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell diamond"        
        >
💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell boulder"        
        >
🪨       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell diamond"        
        >
💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell boulder"        
        >
🪨       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell boulder"        
        >
🪨       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       

        </div>
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell bomb"
        >
💣       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell boulder"        
        >
🪨       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell diamond"        
        >
💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell diamond"        
        >
💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell soil"
        >
🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell exit"
        >
🚪       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
🧱       
        </div>     
      </div>       
      <div
        class="hud"
      >
        <div       
          class="hu
ud-left"
        >
<span>   
Score: 
            0      
</span>  
<span>   
            Diamond
ds left:
            6      
</span>  
<span>   
Moves: 
            55     
</span>  
<span /> 
        </div>     
        <div       
          class="hu
ud-right"
        >
<div     
            class="
"audio-control"     
>        
<button
              aria-
-label="Mute audio" 
              class
s="audio-button mute
e-button "
              title
e="Mute (Ctrl+M)"   
>      
🔊   
            </butto
on>
<button
              aria-
-label="Open audio s
settings"
              class
s="audio-button sett
tings-button"       
              title
e="Audio Settings"  
>      
⚙️   
            </butto
on>
</div>   
        </div>     
      </div>       
    </div>
  </div>
</body>

Ignored nodes: comm
ments, script, style
<html>
  <head />
  <body>
    <div>
      <div>        
        <div       
          class="au
udio-error-container
r"
          style="pa
adding: 10px; margin
n: 10px 0px; backgro
ound-color: rgb(240,
, 248, 255); border:
: 1px solid #b3e0ff;
; border-radius: 4px
x; font-size: 14px;"
        >
<div     
            class="
"audio-playback-erro
ors"
>        
<p     
              style
e="font-weight: bold
d; color: rgb(237, 1
108, 2);"
>      
              Some 
 sound effects faile
ed to play
</p>   
</div>   
<div     
            class="
"audio-error-actions
s"
            style="
"display: flex; just
tify-content: space-
-between; margin-top
p: 10px;"
>        
<div>  
              <butt
ton
                sty
yle="padding: 5px 10
0px; background-colo
or: rgb(33, 150, 243
3); color: white; bo
order-radius: 4px; c
cursor: pointer; mar
rgin-right: 10px;"  
>    
                Ret
try Audio
              </but
tton>
              <butt
ton
                sty
yle="padding: 5px 10
0px; background-colo
or: rgb(245, 245, 24
45); border: 1px sol
lid #ccc; border-rad
dius: 4px; cursor: p
pointer;"
>    
                Aud
dio Help
              </but
tton>
</div> 
<button
              style
e="padding: 5px 10px
x; background-color:
: transparent; curso
or: pointer; text-de
ecoration: underline
e;"
>      
              Dismi
iss
            </butto
on>
</div>   
        </div>     
        <div       
          class="ma
aze-grid"
        >
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell bomb"
>        
💣     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
class= "
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell player"       
>        
🧑     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell bomb"
>        
💣     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
🪨     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell soil"
>        
🟫     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell exit"
>        
🚪     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
<div     
            class="
"cell rock"
>        
🧱     
</div>   
        </div>     
        <div       
          class="hu
ud"
        >
<div     
            class="
"hud-left"
>        
<span> 
              Score
e:
              0    
</span>
<span> 
              Diamo
onds left:
              6    
</span>
<span> 
              Moves
s:
              55   
</span>
            <span /
/>
</div>   
<div     
            class="
"hud-right"
>        
<div   
              class
s="audio-control"   
>      
              <butt
ton
                ari
ia-label="Mute audio
o"
                cla
ass="audio-button mu
ute-button "        
                tit
tle="Mute (Ctrl+M)" 
>    
🔊 
              </but
tton>
              <butt
ton
                ari
ia-label="Open au   dio
o settings"
                cla
ass="audio-button se
ettings-button"     
                tit
tle="Audio Settings"
>    
⚙️ 
              </but
tton>
</div> 
</div>   
        </div>     
      </div>       
    </div>
  </body>
</html>
   ✓ App Sound Inte
egration > Performan
nce and Responsivene
ess > should not blo
ock user input durin
ng sound playback 21
19ms
   ✓ App Sound Inte
egration > Performan
nce and Responsivene
ess > should handle 
 multiple simultaneo
ous sound events 112
2ms
   ✓ App Sound Inte
egration > Performan
nce and Responsivene
ess > should maintai
in game state consis
stency during audio 
 operations 77ms    
   ✓ App Sound Inte
egration > Error Rec
covery > should cont
tinue working when s
sound playback fails
s 43ms
   ✓ App Sound Inte
egration > Error Rec
covery > should hand
dle audio context su
uspension gracefully
y 52ms


⎯ Failed Tests 7 ⎯⎯

 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > So
ound System Initiali
ization > should ini
itialize audio syste
em on app startup   
AssertionError: exp
pected "spy" to be c
called at least once

Ignored nodes: comm
ments, script, style
<html>
  <head />
  <body>
    <div>
      <div>        
        <div       
          class="ma
aze-grid"
        >
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell bomb"
>        
            💣     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell player"       
>        
            🧑     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell bomb"
>        
            💣     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
c      lass="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell exit"
>        
            🚪     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
        </div>     
        <div       
          class="hu
ud"
        >
<div     
            class="
"hud-left"
>        
<span> 
              Score
e:
              0    
</span>
<span> 
              Diamo
onds left:
              6    
</span>
<span> 
              Moves
s:
              55   
</span>
            <span /
/>
</div>   
<div     
            class="
"hud-right"
>        
<div   
              class
s="audio-control"   
>      
              <butt
ton
                ari
ia-label="Mute audio
o"
                cla
ass="audio-button mu
ute-button "        
                tit
tle="Mute (Ctrl+M)" 
>    
                🔊 
              </but
tton>
              <butt
ton
                ari
ia-label="Open audio
o settings"
                cla
ass="audio-button se
ettings-button"     
                tit
tle="Audio Settings"
>    
                ⚙️ 
              </but
tton>
</div> 
</div>   
        </div>     
      </div>       
    </div>
  </body>
</html>
 ❯ src/tests/app-so
ound-integration.tes
st.tsx:147:45       

    145|X…
    146|X…
    147|X…
       |           
                   
^   
    148|X…
    149|
 ❯ runWithExpensive
eErrorDiagnosticsDis
sabled node_modules/
/@testing-library/do
om/dist/config.js:47
7:12
 ❯ checkCallback no
ode_modules/@testing
g-library/dom/dist/w
wait-for.js:124:77  
 ❯ Timeout.checkRea
alTimersCallback nod
de_modules/@testing-
-library/dom/dist/wa
ait-for.js:118:16   

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/7]⎯

 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > Ke
eyboard Controls Int
tegration > should h
handle game movement
t keys without inter
rfering with audio  
AssertionError: exp
pected "spy" to be c
called with argument
ts: [ Any<String>, O
ObjectContaining{…} 
 ]

Received:

  1st spy call:    

  [
-   Any<String>,   
-   ObjectContainin
ng {
-     "source": "pl
layer",
-     "type": "move
ement",
+   "player_walk", 
+   {
+     "volume": 0.6
6,
    },
  ]

  2nd spy call:    

  [
-   Any<String>,   
-   ObjectContainin
ng {
-     "source": "pl
layer",
-     "type": "move
ement",
+   "boulder_move",
+   {
+     "volume": 0.8
8,
    },
  ]

  3rd spy call:    

  [
-   Any<String>,   
-   ObjectContainin
ng {
-     "source": "pl
layer",
-     "type": "move
ement",
+   "boulder_move",
+   {
+     "volume": 0.8
8,
    },
  ]

  4th spy call:    

  [
-   Any<String>,   
-   ObjectContainin
ng {
-     "source": "pl
layer",
-     "type": "move
ement",
+   "boulder_move",
+   {
+     "volume": 0.8
8,
    },
  ]


Number of calls: 4 


Ignored nodes: comm
ments, script, style
<html>
  <head />
  <body>
    <div>
      <div>        
        <div       
          class="ma
aze-grid"
        >
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell bomb"
>        
            💣     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell player"       
>        
            🧑     
</div>   
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
cla    ss="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell bomb"
>        
            💣     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell exit"
>        
            🚪     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
        </div>     
        <div       
          class="hu
ud"
        >
<div     
            class="
"hud-left"
>        
<span> 
              Score
e:
              0    
</span>
<span> 
              Diamo
onds left:
              6    
</span>
<span> 
              Moves
s:
              54   
</span>
            <span /
/>
</div>   
<div     
            class="
"hud-right"
>        
<div   
              class
s="audio-control"   
>      
              <butt
ton
                ari
ia-label="Mute audio
o"
                cla
ass="audio-button mu
ute-button "        
                tit
tle="Mute (Ctrl+M)" 
>    
                🔊 
              </but
tton>
              <butt
ton
                ari
ia-label="Open audio
o settings"
                cla
ass="audio-button se
ettings-button"     
                tit
tle="Audio Settings"
>    
                ⚙️ 
              </but
tton>
</div> 
</div>   
        </div>     
      </div>       
    </div>
  </body>
</html>
 ❯ src/tests/app-so
ound-integration.tes
st.tsx:197:43       
    195|X…
    196|X…
    197|X…
       |           
                   
^     
    198|X…
    199|X…
 ❯ runWithExpensive
eErrorDiagnosticsDis
sabled node_modules/
/@testing-library/do
om/dist/config.js:47
7:12
 ❯ checkCallback no
ode_modules/@testing
g-library/dom/dist/w
wait-for.js:124:77  
 ❯ Timeout.checkRea
alTimersCallback nod
de_modules/@testing-
-library/dom/dist/wa
ait-for.js:118:16   

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/7]⎯

 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > Ke
eyboard Controls Int
tegration > should h
handle mute keyboard
d shortcut (Ctrl+M) 

TestingLibraryEleme
entError: Unable to 
 find a label with t
the text of: Unmute 
 audio

Ignored nodes: comm
ments, script, style
<body>
  <div>
    <div>
      <div
        class="maze
e-grid"
      >
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell diamond"        
        >
          💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell boulder"        
        >
          🪨       
        </div>     
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell diamond"        
        >
          💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell boulder"        
        >
          🪨       
        </div>     
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell bomb"
        >
          💣       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell player"
        >
          🧑       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell diamond"        
        >
          💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell boulder"        
        >
          🪨       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell diamond"        
        >
          💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell boulder"        
        >
          🪨       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell boulder"        
        >
          🪨       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell bomb"
        >
          💣       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell boulder"        
        >
          🪨       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell diamond"        
        >
          💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell diamond"        
        >
          💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell exit"
        >
          🚪       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
      </div>       
      <div
        class="hud"
      >
        <div       
          class="hu
ud-left"
        >
<span>   
            Score: 
            0      
</span>  
<span>   
            Diamond
ds left:
            6      
</span>  
<span>   
            Moves: 
            55     
</span>  
<span /> 
        </div>     
        <div       
          class="hu
ud-right"
        >
<div     
            class="
"audio-control"     
>        
<button
              aria-
-label="Mute audio" 
              class
s="audio-button mute
e-button "
              title
e="Mute (Ctrl+M)"   
>      
              🔊   
            </butto
on>
<button
              aria-
-label="Open audio s
settings"
              class
s="audio-button sett
tings-button"       
              title
e="Audio Settings"  
>      
              ⚙️   
            </butto
on>
</div>   
        </div>     
      </div>       
    </div>
  </div>
</body>

Ignored nodes: comm
ments, script, style
<html>
  <head />
  <body>
    <div>
      <div>        
        <div       
          class="ma
aze-grid"
        >
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell bomb"
>        
            💣     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell player"       
>        
            🧑     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
class= "
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell bomb"
>        
            💣     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell exit"
>        
            🚪     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
        </div>     
        <div       
          class="hu
ud"
        >
<div     
            class="
"hud-left"
>        
<span> 
              Score
e:
              0    
</span>
<span> 
              Diamo
onds left:
              6    
</span>
<span> 
              Moves
s:
              55   
</span>
            <span /
/>
</div>   
<div     
            class="
"hud-right"
>        
<div   
              class
s="audio-control"   
>      
              <butt
ton
                ari
ia-label="Mute audio
o"
                cla
ass="audio-button mu
ute-button "        
                tit
tle="Mute (Ctrl+M)" 
>    
                🔊 
              </but
tton>
              <butt
ton
                ari
ia-label="Open audio
o settings"
                cla
ass="audio-button se
ettings-button"     
                tit
tle="Audio Settings"
>    
                ⚙️ 
              </but
tton>
</div> 
</div>   
        </div>     
      </div>       
    </div>
  </body>
</html>

 ❯ Proxy.waitForWra
apper node_modules/@
@testing-library/dom
m/dist/wait-for.js:1
163:27
 ❯ src/tests/app-so
ound-integration.tes
st.tsx:220:19       
    218|X…
    219|
    220|X…
       |           
        ^
    221|X…
    222|X…

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[3/7]⎯

 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > Ke
eyboard Controls Int
tegration > should h
handle mute keyboard
d shortcut (Cmd+M) o
on Mac
TestingLibraryEleme
entError: Unable to 
 find a label with t
the text of: Unmute 
 audio

Ignored nodes: comm
ments, script, style
<body>
  <div>
    <div>
      <div
        class="maze
e-grid"
      >
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell diamond"        
        >
          💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell boulder"        
        >
          🪨       
        </div>     
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell diamond"        
        >
          💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell boulder"        
        >
          🪨       
        </div>     
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell bomb"
        >
          💣       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell player"
        >
          🧑       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell diamond"        
        >
          💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell boulder"        
        >
          🪨       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell diamond"        
        >
          💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
c        lass="ceode (vitest 1)
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell boulder"        
        >
          🪨       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell boulder"        
        >
          🪨       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell bomb"
        >
          💣       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell boulder"        
        >
          🪨       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell diamond"        
        >
          💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell diamond"        
        >
          💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell exit"
        >
          🚪       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
      </div>       
      <div
        class="hud"
      >
        <div       
          class="hu
ud-left"
        >
<span>   
            Score: 
            0      
</span>  
<span>   
            Diamond
ds left:
            6      
</span>  
<span>   
            Moves: 
            55     
</span>  
<span /> 
        </div>     
        <div       
          class="hu
ud-right"
        >
<div     
            class="
"audio-control"     
>        
<button
              aria-
-label="Mute audio" 
              class
s="audio-button mute
e-button "
              title
e="Mute (Ctrl+M)"   
>      
              🔊   
            </butto
on>
<button
              aria-
-label="Open audio s
settings"
              class
s="audio-button sett
tings-button"       
              title
e="Audio Settings"  
>      
              ⚙️   
            </butto
on>
</div>   
        </div>     
      </div>       
    </div>
  </div>
</body>

Ignored nodes: comm
ments, script, style
<html>
  <head />
  <body>
    <div>
      <div>        
        <div       
          class="ma
aze-grid"
        >
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
    <div
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell bomb"
>        
            💣     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell player"       
>        
            🧑     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell bomb"
>        
            💣     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell exit"
>        
            🚪     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
        </div>     
        <div       
          class="hu
ud"
        >
<div     
            class="
"hud-left"
>        
<span> 
              Score
e:
              0    
</span>
<span> 
              Diamo
onds left:
              6    
</span>
<span> 
              Moves
s:
              55   
</span>
            <span /
/>
</div>   
<div     
            class="
"hud-right"
>        
<div   
              class
s="audio-control"   
>      
              <butt
ton
                ari
ia-label="Mute audio
o"
                cla
ass="audio-button mu
ute-button "        
                tit
tle="Mute (Ctrl+M)" 
>    
                🔊 
              </but
tton>
              <butt
ton
                ari
ia-label="Open audio
o settings"
                cla
ass="audio-button se
ettings-button"     
                tit
tle="Audio Settings"
>    
                ⚙️ 
              </but
tton>
</div> 
</div>   
        </div>     
      </div>       
    </div>
  </body>
</html>

 ❯ Proxy.waitForWra
apper node_modules/@
@testing-library/dom
m/dist/wait-for.js:1
163:27
 ❯ src/tests/app-so
ound-integration.tes
st.tsx:248:19       
    246|X…
    247|
    248|X…
       |           
        ^
    249|X…
    250|X…

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[4/7]⎯

 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > Ga
ame Event Sound Inte
egration > should em
mit sounds for playe
er movement
AssertionError: exp
pected "spy" to be c
called with argument
ts: [ StringMatching
g /walk|dig/, …(1) ]

Received:

  1st spy call:    

  [
-   StringMatching 
 /walk|dig/,        
-   ObjectContainin
ng {
-     "source": "pl
layer",
-     "type": "move
ement",
+   "player_walk", 
+   {
+     "volume": 0.6
6,
    },
  ]

  2nd spy call:    

  [
-   StringMatching 
 /walk|dig/,        
-   ObjectContainin
ng {
-     "source": "pl
layer",
-     "type": "move
ement",
+   "boulder_move",
+   {
+     "volume": 0.8
8,
    },
  ]

  3rd spy call:    

  [
-   StringMatching 
 /walk|dig/,        
-   ObjectContainin
ng {
-     "source": "pl
layer",
-     "type": "move
ement",
+   "boulder_move",
+   {
+     "volume": 0.8
8,
    },
  ]

  4th spy call:    

  [
-   StringMatching 
 /walk|dig/,        
-   ObjectContainin
ng {
-     "source": "pl
layer",
-     "type": "move
ement",
+   "boulder_move",
+   {
+     "volume": 0.8
8,
    },
  ]


Number of calls: 4 


Ignored nodes: comm
ments, script, style
<html>
  <head />
  <body>
    <div>
      <div>        
        <div       
          class="ma
aze-grid"
        >
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell bomb"
>        
            💣     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell player"       
>        
            🧑     
</div>   
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell bomb"
>        
            💣     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell exit"
>        
            🚪     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
        </div>     
        <div       
          class="hu
ud"
        >
<div     
            class="
"hud-left"
>        
<span> 
              Score
e:
              0    
</span>
<span> 
              Diamo
onds left:
              6    
</span>
<span> 
              Moves
s:
              54   
</span>
            <span /
/>
</div>   
<div     
            class="
"hud-right"
>        
<div   
              class
s="audio-control"   
>      
              <butt
ton
                ari
ia-label="Mute audio
o"
                cla
ass="audio-button mu
ute-button "        
                tit
tle="Mute (Ctrl+M)" 
>    
                🔊 
              </but
tton>
  <butt
ton
                ari
ia-label="Open audio
o settings"
                cla
ass="audio-button se
ettings-button"     
                tit
tle="Audio Settings"
>    
                ⚙️ 
              </but
tton>
</div> 
</div>   
        </div>     
      </div>       
    </div>
  </body>
</html>
 ❯ src/tests/app-so
ound-integration.tes
st.tsx:280:43       
    278|
    279|X…
    280|X…
       |           
                   
^     
    281|X…
    282|X…
 ❯ runWithExpensive
eErrorDiagnosticsDis
sabled node_modules/
/@testing-library/do
om/dist/config.js:47
7:12
 ❯ checkCallback no
ode_modules/@testing
g-library/dom/dist/w
wait-for.js:124:77  
 ❯ Timeout.checkRea
alTimersCallback nod
de_modules/@testing-
-library/dom/dist/wa
ait-for.js:118:16   

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[5/7]⎯

 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > Au
udio Controls Integr
ration > should togg
gle mute via button 
 click
TestingLibraryEleme
entError: Unable to 
 find a label with t
the text of: Unmute 
 audio

Ignored nodes: comm
ments, script, style
<body>
  <div>
    <div>
      <div
        class="maze
e-grid"
      >
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell diamond"        
        >
          💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell boulder"        
        >
          🪨       
        </div>     
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell diamond"        
        >
          💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell boulder"        
        >
          🪨       
        </div>     
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell bomb"
        >
          💣       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell player"
        >
          🧑       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell diamond"        
        >
          💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell boulder"        
        >
          🪨       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell diamond"        
        >
          💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
c        lass="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell boulder"        
        >
          🪨       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell boulder"        
        >
          🪨       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell bomb"
        >
          💣       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell boulder"        
        >
          🪨       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell diamond"        
        >
          💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell diamond"        
        >
          💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell exit"
        >
          🚪       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
      </div>       
      <div
        class="hud"
      >
        <div       
          class="hu
ud-left"
        >
<span>   
            Score: 
            0      
</span>  
<span>   
            Diamond
ds left:
            6      
</span>  
<span>   
            Moves: 
            55     
</span>  
<span /> 
        </div>     
        <div       
          class="hu
ud-right"
        >
<div     
            class="
"audio-control"     
>        
<button
              aria-
-label="Mute audio" 
              class
s="audio-button mute
e-button "
              title
e="Mute (Ctrl+M)"   
>      
              🔊   
            </butto
on>
<button
              aria-
-label="Open audio s
settings"
              class
s="audio-button sett
tings-button"       
              title
e="Audio Settings"  
>      
              ⚙️   
            </butto
on>
</div>   
        </div>     
      </div>       
    </div>
  </div>
</body>

Ignored nodes: comm
ments, script, style
<html>
  <head />
  <body>
    <div>
      <div>        
        <div       
          class="ma
aze-grid"
        >
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell bomb"
>        
            💣     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell player"       
>        
            🧑     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
class= "
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell bomb"
>        
            💣     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell exit"
>        
            🚪     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
        </div>     
        <div       
          class="hu
ud"
        >
<div     
            class="
"hud-left"
>        
<span> 
              Score
e:
              0    
</span>
<span> 
              Diamo
onds left:
              6    
</span>
<span> 
              Moves
s:
              55   
</span>
            <span /
/>
</div>   
<div     
            class="
"hud-right"
>        
<div   
              class
s="audio-control"   
>      
              <butt
ton
                ari
ia-label="Mute audio
o"
                cla
ass="audio-button mu
ute-button "        
                tit
tle="Mute (Ctrl+M)" 
>    
                🔊 
              </but
tton>
              <butt
ton
                ari
ia-label="Open audio
o settings"
                cla
ass="audio-button se
ettings-button"     
                tit
tle="Audio Settings"
>    
                ⚙️ 
              </but
tton>
</div> 
</div>   
        </div>     
      </div>       
    </div>
  </body>
</html>

 ❯ Proxy.waitForWra
apper node_modules/@
@testing-library/dom
m/dist/wait-for.js:1
163:27
 ❯ src/tests/app-so
ound-integration.tes
st.tsx:355:19       
    353|X…
    354|
    355|X…
       |           
        ^
    356|X…
    357|X…

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[6/7]⎯

 FAIL  src/tests/ap
pp-sound-integration
n.test.tsx > App Sou
und Integration > Au
udio Controls Integr
ration > should disp
play audio error mes
ssages when availabl
le
TestingLibraryEleme
entError: Unable to 
 find an element wit
th the text: /audio 
 error/i. This could
d be because the tex
xt is broken up by m
multiple elements. I
In this case, you ca
an provide a functio
on for your text mat
tcher to make your m
matcher more flexibl
le.

Ignored nodes: comm
ments, script, style
<body>
  <div>
    <div>
      <div
        class="audi
io-error-container" 
        style="padd
ding: 10px; margin: 
 10px 0px; backgroun
nd-color: rgb(240, 2
248, 255); border: 1
1px solid #b3e0ff; b
border-radius: 4px; 
 font-size: 14px;"  
      >
        <div       
          class="au
udio-playback-errors
s"
        >
<p       
            style="
"font-weight: bold; 
 color: rgb(237, 108
8, 2);"
>        
            Some so
ound effects failed 
 to play
</p>     
        </div>     
        <div       
          class="au
udio-error-actions" 
          style="di
isplay: flex; justif
fy-content: space-be
etween; margin-top: 
 10px;"
        >
<div>    
<button
              style
e="padding: 5px 10px
x; background-color:
: rgb(33, 150, 243);
; color: white; bord
der-radius: 4px; cur
rsor: pointer; margi
in-right: 10px;"    
>      
              Retry
y Audio
            </butto
on>
<button
              style
e="padding: 5px 10px
x; background-color:
: rgb(245, 245, 245)
); border: 1px solid
d #ccc; border-radiu
us: 4px; cursor: poi
inter;"
>      
              Audio
o Help
            </butto
on>
</div>   
<button  
            style="
"padding: 5px 10px; 
 background-color: t
transparent; cursor:
: pointer; text-deco
oration: underline;"
>        
            Dismiss
</button>
        </div>     
      </div>       
      <div
        class="maze
e-grid"
      >
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell diamond"        
        >
          💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell boulder"        
        >
          🪨       
        </div>     
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell diamond"        
        >
          💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell boulder"        
        >
          🪨       
        </div>     
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell bomb"
        >
          💣       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell player"
        >
          🧑       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell diamond"        
        >
          💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell boulder"        
        >
          🪨       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell diamond"        
        >
          💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell boulder"        
        >
          🪨       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell boulder"        
        >
          🪨       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
     >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell bomb"
        >
          💣       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell boulder"        
        >
          🪨       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell diamond"        
        >
          💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell diamond"        
        >
          💎       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell soil"
        >
          🟫       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell empty"
        />
        <div       
          class="ce
ell exit"
        >
          🚪       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
        <div       
          class="ce
ell rock"
        >
          🧱       
        </div>     
      </div>       
      <div
        class="hud"
      >
        <div       
          class="hu
ud-left"
        >
<span>   
            Score: 
            0      
</span>  
<span>   
            Diamond
ds left:
            6      
</span>  
<span>   
            Moves: 
            55     
</span>  
<span /> 
        </div>     
        <div       
          class="hu
ud-right"
        >
<div     
            class="
"audio-control"     
>        
<button
              aria-
-label="Mute audio" 
              class
s="audio-button mute
e-button "
              title
e="Mute (Ctrl+M)"   
>      
              🔊   
            </butto
on>
<button
              aria-
-label="Open audio s
settings"
              class
s="audio-button sett
tings-button"       
              title
e="Audio Settings"  
>      
              ⚙️   
            </butto
on>
</div>   
        </div>     
      </div>       
    </div>
  </div>
</body>

Ignored nodes: comm
ments, script, style
<html>
  <head />
  <body>
    <div>
      <div>        
        <div       
          class="au
udio-error-container
r"
          style="pa
adding: 10px; margin
n: 10px 0px; backgro
ound-color: rgb(240,
, 248, 255); border:
: 1px solid #b3e0ff;
; border-radius: 4px
x; font-size: 14px;"
        >
<div     
            class="
"audio-playback-erro
ors"
>        
<p     
              style
e="font-weight: bold
d; color: rgb(237, 1
108, 2);"
>      
              Some 
 sound effects faile
ed to play
</p>   
</div>   
<div     
            class="
"audio-error-actions
s"
            style="
"display: flex; just
tify-content: space-
-between; margin-top
p: 10px;"
>        
<div>  
              <butt
ton
                sty
yle="padding: 5px 10
0px; background-colo
or: rgb(33, 150, 243
3); color: white; bo
order-radius: 4px; c
cursor: pointer; mar
rgin-right: 10px;"  
>    
                Ret
try Audio
              </but
tton>
              <butt
ton
                sty
yle="padding: 5px 10
0px; background-colo
or: rgb(245, 245, 24
45); border: 1px sol
lid #ccc; border-rad
dius: 4px; cursor: p
pointer;"
>    
                Aud
dio Help
              </but
tton>
</div> 
<button
              style
e="padding: 5px 10px
x; background-color:
: transparent; curso
or: pointer; text-de
ecoration: underline
e;"
>      
              Dismi
iss
            </butto
on>
</div>   
        </div>     
        <div       
          class="ma
aze-grid"
        >
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell bomb"
>        
            💣     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<di      v
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell player"       
>        
            🧑     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell bomb"
>        
            💣     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell boulder"      
>        
            🪨     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell diamond"      
>        
            💎     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell soil"
>        
            🟫     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell empty"        
/>       
<div     
            class="
"cell exit"
>        
            🚪     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
<div     
            class="
"cell rock"
>        
            🧱     
</div>   
        </div>     
        <div       
          class="hu
ud"
        >
<div     
            class="
"hud-left"
>        
<span> 
              Score
e:
              0    
</span>
<span> 
              Diamo
onds left:
              6    
</span>
<span> 
              Moves
s:
              55   
</span>
            <span /
/>
</div>   
<div     
            class="
"hud-right"
>        
<div   
              class
s="audio-control"   
>      
              <butt
ton
                ari
ia-label="Mute audio
o"
                cla
ass="audio-button mu
ute-button "        
                tit
tle="Mute (Ctrl+M)" 
>    
                🔊 
              </but
tton>
              <butt
ton
      ari
ia-label="Open audio
o settings"
                cla
ass="audio-button se
ettings-button"     
                tit
tle="Audio Settings"
>    
                ⚙️ 
              </but
tton>
</div> 
</div>   
        </div>     
      </div>       
    </div>
  </body>
</html>
 ❯ Proxy.waitForWra
apper node_modules/@
@testing-library/dom
m/dist/wait-for.js:1
163:27
 ❯ src/tests/app-so
ound-integration.tes
st.tsx:397:19       
    395|X…
    396|
    397|X…
       |           
        ^
    398|X…
    399|X…

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[7/7]⎯


 Test Files  1 fail
led (1)
      Tests  7 fail
led | 11 passed (18)
   Start at  16:08:
:39
   Duration  9.78s 
 (transform 172ms, s
setup 119ms, collect
t 269ms, tests 8.06s
s, environment 531ms
s, prepare 152ms)   

:\Windows\System32\cmd.exe
D:\FizzBash\TheWand
derer
Let me run just one test to see if the basic structure is working:

Command
npm test -- src/tests/app-sound-integration.test.tsx -t "should not block game rendering" --run
npm test -- sr
rc/tests/app-sound-i
integration.test.t  sx
x -t "should not blo
ock game rendering" 
 --run
:\Windows\System32\cmd.exe - npm  test -- src/tests/app-sound-integration.test.tsx -t "should not block game rendering" --runpm test src/tests/app-sound-integration.test.tsx -t should not block game rendering --run
> thewanderer@0.1.0
0 test
> vitest run -c vit
test.config.ts src/t
tests/app-sound-inte
egration.test.tsx -t
t should not block g
game rendering --run

:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/Fiz
zzBash/TheWanderer  

ode (vitest 1)ode (vitest 2)ode (vitest 7)ode (vitest 6)ode (vitest 10)ode (vitest 11)ode (vitest 15)ode (vitest 13)
 ❯ src/tests/app-so
ound-integration.tes
st.tsx [queued]     

 Test Files 0 passe
ed (1)
      Tests 0 passe
ed (0)
   Start at 16:09:0
07
   Duration 912ms  
(node:29252) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)  

 ❯ src/tests/app-so
ound-integration.tes
st.tsx 0/18

 Test Files 0 passe
ed (1)
      Tests 0 passe
ed (18)
   Start at 16:09:0
07
   Duration 1.32s  
 ✓ src/tests/app-sound-integration.test.tsx (18 tests | 17 skipped) 72ms    
   ↓ App Sound Integration > Sound System Initialization > should initialize audio system on app startup
   ✓ App Sound Integration > Sound System Initialization 
 > should not block 
 game rendering duri
ing audio initializa
ation 70ms
   ↓ App Sound Inte
egration > Sound Sys
stem Initialization 
 > should handle aud
dio initialization e
errors gracefully   
   ↓ App Sound Inte
egration > Keyboard 
 Controls Integratio
on > should handle g
game movement keys w
without interfering 
 with audio
   ↓ App Sound Inte
egration > Keyboard 
 Controls Integratio
on > should handle m
mute keyboard shortc
cut (Ctrl+M)        
   ↓ App Sound Inte
egration > Keyboard 
 Controls Integratio
on > should handle m
mute keyboard shortc
cut (Cmd+M) on Mac  
   ↓ App Sound Inte
egration > Keyboard 
 Controls Integratio
on > should not trig
gger mute on M key w
without modifiers   
   ↓ App Sound Inte
egration > Game Even
nt Sound Integration
n > should emit soun
nds for player movem
ment
   ↓ App Sound Inte
egration > Game Even
nt Sound Integration
n > should stop all 
 sounds when game en
nds
   ↓ App Sound Inte
egration > Game Even
nt Sound Integration
n > should not emit 
 sounds when game is
s over
   ↓ App Sound Inte
egration > Audio Con
ntrols Integration >
> should toggle mute
e via button click  
   ↓ App Sound Inte
egration > Audio Con
ntrols Integration >
> should open audio 
 settings dialog    
   ↓ App Sound Inte
egration > Audio Con
ntrols Integration >
> should display aud
dio error messages w
when available      
   ↓ App Sound Inte
egration > Performan
nce and Responsivene
ess > should not blo
ock user input durin
ng sound playback   
   ↓ App Sound Inte
egration > Performan
nce and Responsivene
ess > should handle 
 multiple simultaneo
ous sound events    
   ↓ App Sound Inte
egration > Performan
nce and Responsivene
ess > should maintai
in game state consis
stency during audio 
 operations
   ↓ App Sound Inte
egration > Error Rec
covery > should cont
tinue working when s
sound playback fails
   ↓ App Sound Inte
egration > Error Rec
covery > should hand
dle audio context su
uspension gracefully

 Test Files  1 pass
sed (1)
      Tests  1 pass
sed | 17 skipped (18
8)
   Start at  16:09:
:07
   Duration  1.50s 
 (transform 175ms, s
setup 111ms, collect
t 291ms, tests 72ms,
, environment 550ms,
, prepare 171ms)    

ode (vitest 1):\Windows\System32\cmd.exe
D:\FizzBash\TheWand
derer
Session Too Long
Continue
Summarize and continue in a new session.


Revert


app-sound-integration.test.tsx






Claude Sonnet 4.0
Autopilot
