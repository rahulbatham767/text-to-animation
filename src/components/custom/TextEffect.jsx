import React from "react";

const AnimatedText = ({ overlay }) => {
  return (
    <div
      className="relative flex justify-center  items-center 
      h-72"
    >
      <div
        className={`${
          overlay ? "overlay" : ""
        } absolute top-0 left-0  bg-gray-800 opacity-50`}
      ></div>
      <div className="text text-6xl font-semibold flex items-center space-x-1 z-10">
        <div className="flex flex-col items-center justify-center">
          <div className="flex ">
            <div className="wrapper ">
              <div id="W" className="letter">
                W
              </div>
              <div className="shadow hidden">W</div>
            </div>
            <div className="wrapper">
              <div id="e1" className="letter">
                e
              </div>
              <div className="shadow hidden">e</div>
            </div>
            <div className="wrapper">
              <div id="l1" className="letter">
                l
              </div>
              <div className="shadow hidden">l</div>
            </div>
            <div className="wrapper">
              <div id="c" className="letter">
                c
              </div>
              <div className="shadow hidden">c</div>
            </div>
            <div className="wrapper">
              <div id="o" className="letter">
                o
              </div>
              <div className="shadow hidden">o</div>
            </div>
            <div className="wrapper">
              <div id="m" className="letter">
                m
              </div>
              <div className="shadow hidden">m</div>
            </div>
            <div className="wrapper">
              <div id="e2" className="letter">
                e
              </div>
              <div className="shadow hidden">e</div>
            </div>
          </div>

          <div className="flex">
            <div className="wrapper">
              <div id="T" className="letter">
                {""}
              </div>
              <div className="shadow hidden"></div>
            </div>
            <div className="flex">
              <div className="wrapper">
                <div id="T" className="letter">
                  T
                </div>
                <div className="shadow hidden">T</div>
              </div>
              <div className="wrapper">
                <div id="o2" className="letter">
                  o
                </div>
                <div className="shadow hidden">o</div>
              </div>

              <div id="space1" className="letter"></div>
              <div className="shadow hidden"> </div>
              <div className="wrapper">
                <div id="space1" className="letter"></div>
                <div className="shadow hidden"> </div>
              </div>
              <div className="wrapper">
                <div id="T2" className="letter">
                  T
                </div>
                <div className="shadow hidden">T</div>
              </div>
              <div className="wrapper">
                <div id="e3" className="letter">
                  e
                </div>
                <div className="shadow hidden">e</div>
              </div>
              <div className="wrapper">
                <div id="x" className="letter">
                  x
                </div>
                <div className="shadow hidden">x</div>
              </div>
              <div className="wrapper">
                <div id="t" className="letter">
                  t
                </div>
                <div className="shadow hidden">t</div>
              </div>
            </div>
          </div>

          <div className="wrapper w-full">
            <div id="space2" className="letter">
              {" "}
            </div>
            <div className="shadow hidden"> </div>
          </div>
          <div className="flex">
            <div className="wrapper">
              <div id="I" className="letter">
                A
              </div>
              <div className="shadow hidden">A</div>
            </div>
            <div className="wrapper">
              <div id="m2" className="letter">
                n
              </div>
              <div className="shadow hidden">n</div>
            </div>
            <div className="wrapper">
              <div id="a" className="letter">
                i
              </div>
              <div className="shadow hidden">i</div>
            </div>
            <div className="wrapper">
              <div id="k" className="letter">
                m
              </div>
              <div className="shadow hidden">m</div>
            </div>
            <div className="wrapper">
              <div id="e4" className="letter">
                a
              </div>
              <div className="shadow hidden">a</div>
            </div>
            <div className="wrapper">
              <div id="r" className="letter">
                t
              </div>
              <div className="shadow hidden">t</div>
            </div>
            <div className="wrapper">
              <div id="r" className="letter">
                i
              </div>
              <div className="shadow hidden">i</div>
            </div>
            <div className="wrapper">
              <div id="r" className="letter">
                o
              </div>
              <div className="shadow hidden">o</div>
            </div>
            <div className="wrapper">
              <div id="r" className="letter">
                n
              </div>
              <div className="shadow hidden">n</div>
            </div>
          </div>
          {/*  */}
          <div className="wrapper">
            <div id="space2" className="letter">
              {" "}
            </div>
            <div className="shadow hidden"> </div>
          </div>
          <div className="flex">
            <div className="wrapper ">
              <div id="W" className="letter">
                M
              </div>
              <div className="shadow hidden">M</div>
            </div>
            <div className="wrapper">
              <div id="e1" className="letter">
                a
              </div>
              <div className="shadow hidden">a</div>
            </div>
            <div className="wrapper">
              <div id="l1" className="letter">
                k
              </div>
              <div className="shadow hidden">k</div>
            </div>
            <div className="wrapper">
              <div id="c" className="letter">
                e
              </div>
              <div className="shadow hidden">e</div>
            </div>
            <div className="wrapper">
              <div id="o" className="letter">
                r
              </div>
              <div className="shadow hidden">r</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedText;
