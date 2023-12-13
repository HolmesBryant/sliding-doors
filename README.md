# Sliding Doors Web Component #

This component creates a sliding door effect to reveal or hide some content.

Demo: https://holmesbryant.github.io/sliding-doors/

It provides three stock themes, "default", "light" and "dark". You may also define your own custom theme by setting some css variables. You may set these variables on "sliding-doors" in a css stylesheet.

    sliding-doors {
      --tintOuter: red;
      --tintMiddle: green;
      --tintInner: blue;
    }


Or you may set the variables in the "style" attribute of the custom element itself. Don't forget to add the double hyphons (--).

    <sliding-doors style="--tintInner:red;--tintMiddle:green;--tintOuter:blue"></sliding-doors>

You can also include an image, SVG, custom element or any standard DOM element as an overlay on top of the doors. Any css rules applied to this element, including css animations, will be preserved. In order to do this, you must add an element having the attribute <code>[slot="effect"]</code>

    <sliding-doors>
      <p>Some content behind the doors</p>
      <div slot="effect" class="animated-icon"></div>
    </sliding-doors>

The component exposes three custom attributes: "active", "speed" and "theme" which will be described below. You may add one or more of these attributes to the component like this:

    <sliding-doors active speed="1" theme="light">...</sliding-doors>

## Attributes ##

- <b>active (default: "true")</b> Acceptable values: ["true", "false"]. The doors are closed when the "active" attribute is present. This attribute may have no value or may have any value other than "false". The doors are open when active is "false" or the attribute is removed. <b>By default, the doors are open (false) on initialization. This means that you will not see any effect whatsoever. If you would like to initialize the component with the doors closed, add this attribute.</b>

- <b>speed (default: ".5s")</b> Acceptable values: [any valid css time value]. The speed at which the doors open and close. ".5s" means half a second. "1000ms" means 1000 milliseconds. If you just use a number with no measurement, such as "3", it will be interpreted as seconds.

- <b>theme (default: "default")</b> Acceptable values: [ "default", "light", "dark", "auto"]. The gradient on the doors is composed of three color stops. "Theme" refers to the colors applied to these stops. The component includes three themes: "default", "light" and "dark". "Auto" will automatically choose "dark" if [prefers-color-scheme] in the client is set to "dark"; otherwise it will choose "light".

## Usage ##

    <html>
      <head>
        <script defer type="module" src="sliding-doors.js"></script>
      </head>
      <body>
        <sliding-doors active>
          <p>Some content...</p>
          <div slot="effect">This can be any valid DOM, SVG, or Custom element</div>
        </sliding-doors>

        <button onclick="openDoors">Open</button>
        <button onclick="closeDoors">Close</button>

        <script>
          function openDoors() {
            const elem = document.querySelector('sliding-doors');
            elem.removeAttribute('active');
          }

          function closeDoors() {
            const elem = document.querySelector('sliding-doors');
            elem.setAttribute('active', 'true');
          }
        </script>
      </body>
    </html>

