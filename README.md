# Sliding Doors Web Component #

This component creates a sliding door effect to reveal or hide some content. It provides three stock themes, "default", "light" and "dark". You may also define your own custom theme by setting some css variables. You may set these variables on "sliding-doors" in a css stylesheet.

    sliding-doors {
      --tintOuter: red;
      --tintMiddle: green;
      --tintInner: blue;
    }


Or you may set the variables in the "style" attribute of the custom element itself. Don't forget to add the double hyphons (--).

    <sliding-doors style="--tintInner:red;--tintMiddle:green;--tintOuter:blue"></sliding-doors>

You can also include an image, gradient, SVG icon or any DOM element as an overlay on top of the doors. In order to do this, you must add an element having the attribute <code>[slot="effect"]</code>

    <sliding-doors>
      <p>Some content behind the doors</p>
      <div slot="effect" class="gradient"></div>
    </sliding-doors>

The component exposes three custom attributes: "active", "speed" and "theme" which will be described below. You may add one or more of these attributes to the component like this:

    <sliding-doors active speed="1" theme="light">...</sliding-doors>

## Attributes ##

- <b>active (default: "true")</b> Acceptable values: ["true", "false", null]. The doors are closed when the "active" attribute is present. This attribute may have no value or may have any value other than "false". The doors are open when active is "false" or the attribute is removed. By default, the doors are open (false) on initialization. This means that you will not see any effect whatsoever. If you would like to initialize the component with the doors closed, add this attribute, ie. <sliding-doors active>...</sliding-doors>.

- <b>speed (default: ".5s")</b> Acceptable values: [any valid css time value]. The speed at which the doors open and close. ".5s" means half a second. "1000ms" means 1000 milliseconds. If you just use a number with no measurement, such as "3", it will be interpreted as seconds.

- <b>theme (default: "default")</b> Acceptable values: [null, "default", "light", "dark"]. The gradient on the doors is composed of three color stops. "Theme" refers to the colors applied to these stops. The component includes three themes: "default", "light" and "dark".

## Usage ##

  <html>
    <head>
      <script defer type="module" src="sliding-doors.js"></script>
    </head>
    <body>
      <sliding-doors active>
        <p>Some content...</p>
        <div slot="effect">This can be any valid DOM or SVG element</div>
      </sliding-doors>
    </body>
  </html>

