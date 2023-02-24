import React from "react";
import { RWebShare } from "react-web-share";
// import "./styles.css";

const Example = () => {
  return (
    <div>
      <RWebShare
        data={{
          text: "Like humans, flamingos make friends for life",
          url: "https://on.natgeo.com/2zHaNup",
          title: "Share this article on Flamingos"
        }}
        onClick={() => console.info("share successful!")}
      >
        <button>Share</button>
      </RWebShare>
      <div className="warning">
        Warning: Copy to clipboard will NOT work here due to iframe origin
        policy in codesandbox use external window to test that feature
      </div>
    </div>
  );
};

export default Example;
