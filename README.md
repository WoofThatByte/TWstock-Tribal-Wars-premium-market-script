<a name="readme-top"></a>



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://github.com/WoofThatByte/TWstock/assets/64849119/026ddf9a-bb46-4c11-b45a-e8fa0a8397a0" alt="Logo" width="400" height="300">
  </a>

  <h3 align="center">Tribal Wars helper for the premium market</h3>

  <p align="center">
    <a href="https://github.com/othneildrew/Best-README-Template"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/WoofThatByte/TWstock">View App</a>
    ·
    <a href="https://github.com/WoofThatByte/TWstock/issues">Report Bug</a>
    ·
    <a href="https://github.com/WoofThatByte/TWstock/issues">Request Features</a>
  </p>
</div>


<!-- ABOUT THE PROJECT -->
## TWstock - The premium extension for the premium market

[![Product Name Screen Shot][product-screenshot]](https://example.com)

<b>TWStock</b> is an semi-automatic open source <b>Chrome extension</b> for Tribal Wars to help you buy the premium resources faster in early game.  It helps you to interact with the inputs elements in the Stock Market page. Works with the following links:

 "https://*.triburile.ro/*screen=market*mode=exchange*"
 <br />
  "https://*.tribalwars.co.uk/*screen=market*mode=exchange*"
  <br />
  "https://*.tribalwars.net/*screen=market*mode=exchange*"
  <br />

Completly stealth:
* The injected/content script runs in an isolate world. An isolated world is a private execution environment that isn't accessible to the page or other extensions. A practical consequence of this isolation is that JavaScript variables in an extension's content scripts are not visible to the host page or other extensions' content scripts. The concept was originally introduced with the initial launch of Chrome, providing isolation for browser tabs.
* No interaction with the UI. The stock market web page is not modified. 
* Integrated in the Chrome browser as an extension :accessibility:
* All in all, cannot be detected!


<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Built With

* Javascript
* HTML
* CSS

### Works With

* Chrome Browser

### Installation
1. Install Chrome Browser
2. Open Chrome -> go to Manage Extensions -> Check Developer mode -> Load unpacked -> Select the folder
3. Activate extension (toggle button above the Premium page)
4. Open Tribal Wars -> Market -> Stock exchange

### How It  Works 
1. Extension consist of two  pages:
   * Premium - View to manipulate stock exchange inputs
   * Junk - View  with  some more  or less usefull calculators like: How much resources has been lost, Time to backstab enemy, Time to autosplit under 10 minutes
  



<img src="https://github.com/WoofThatByte/TWstock/assets/64849119/84e3d6a4-0223-4b31-85c5-69431a074997" alt="premium" width="400" height="250">




2. Premium view:
   * You can enable/disable the automatic refresh for the stock market page. Automatic refresh is set in miliseconds using the input element
   * You can set how much wood, stone or iron you want to buy. By default: 10.000
   * If refresh is enabled the page wil refresh everytime untill you click in one of the three inptus elements of the stock market
   * You can click only one input 
   * When you click the input the extension will fetch the available quantity in the range you set (Default: 10.000)
   * The quantity is multiplied according to exchange rate. If the exchange rate is 64 wood / 1 premium  point and you set 2.000 to buy, you  will get the maximum 1.984 wood if more than 2000 wood is available the time you clicked. (2000/64 = rounded to 31. Then 31*64=1984).

<b>This  is semiautomatic</b>. You set value you want to buy -> Click input element -> logic behind will  get  the value for you  so you  dont have to type in  ->  enter -> enter!


<img src="https://github.com/WoofThatByte/TWstock/assets/64849119/a45cf8a0-5654-4260-9b70-13f69bd29d04" alt="junk" width="400" height="250">
 
 3. Junk view:
    * Insert the units number to get the total resource
    * Set the time for backstab calculator in the format that has been provided
    * Set the time for autosplit calculator in the format that has been provided

<p align="right">(<a href="#readme-top">back to top</a>)</p>
