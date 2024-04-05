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
        }overlay absolute top-0 left-0  bg-gray-800 opacity-50`}
      ></div>
      <div className="text text-6xl font-semibold flex items-center space-x-1 z-10">
        <div className="flex flex-col items-center justify-center">
          <div className="flex ">
            <div className="wrapper ">
              <div id="W" className="letter">
                W
              </div>
              <div className="shadow">W</div>
            </div>
            <div className="wrapper">
              <div id="e1" className="letter">
                e
              </div>
              <div className="shadow">e</div>
            </div>
            <div className="wrapper">
              <div id="l1" className="letter">
                l
              </div>
              <div className="shadow">l</div>
            </div>
            <div className="wrapper">
              <div id="c" className="letter">
                c
              </div>
              <div className="shadow">c</div>
            </div>
            <div className="wrapper">
              <div id="o" className="letter">
                o
              </div>
              <div className="shadow">o</div>
            </div>
            <div className="wrapper">
              <div id="m" className="letter">
                m
              </div>
              <div className="shadow">m</div>
            </div>
            <div className="wrapper">
              <div id="e2" className="letter">
                e
              </div>
              <div className="shadow">e</div>
            </div>
          </div>

          <div className="flex">
            <div className="wrapper">
              <div id="T" className="letter">
                {""}
              </div>
              <div className="shadow"></div>
            </div>
            <div className="flex">
              <div className="wrapper">
                <div id="T" className="letter">
                  T
                </div>
                <div className="shadow">T</div>
              </div>
              <div className="wrapper">
                <div id="o2" className="letter">
                  o
                </div>
                <div className="shadow">o</div>
              </div>

              <div id="space1" className="letter"></div>
              <div className="shadow"> </div>
              <div className="wrapper">
                <div id="space1" className="letter"></div>
                <div className="shadow"> </div>
              </div>
              <div className="wrapper">
                <div id="T2" className="letter">
                  T
                </div>
                <div className="shadow">T</div>
              </div>
              <div className="wrapper">
                <div id="e3" className="letter">
                  e
                </div>
                <div className="shadow">e</div>
              </div>
              <div className="wrapper">
                <div id="x" className="letter">
                  x
                </div>
                <div className="shadow">x</div>
              </div>
              <div className="wrapper">
                <div id="t" className="letter">
                  t
                </div>
                <div className="shadow">t</div>
              </div>
            </div>
          </div>

          <div className="wrapper w-full">
            <div id="space2" className="letter">
              {" "}
            </div>
            <div className="shadow"> </div>
          </div>
          <div className="flex">
            <div className="wrapper">
              <div id="I" className="letter">
                A
              </div>
              <div className="shadow">A</div>
            </div>
            <div className="wrapper">
              <div id="m2" className="letter">
                n
              </div>
              <div className="shadow">n</div>
            </div>
            <div className="wrapper">
              <div id="a" className="letter">
                i
              </div>
              <div className="shadow">i</div>
            </div>
            <div className="wrapper">
              <div id="k" className="letter">
                m
              </div>
              <div className="shadow">m</div>
            </div>
            <div className="wrapper">
              <div id="e4" className="letter">
                a
              </div>
              <div className="shadow">a</div>
            </div>
            <div className="wrapper">
              <div id="r" className="letter">
                t
              </div>
              <div className="shadow">t</div>
            </div>
            <div className="wrapper">
              <div id="r" className="letter">
                i
              </div>
              <div className="shadow">i</div>
            </div>
            <div className="wrapper">
              <div id="r" className="letter">
                o
              </div>
              <div className="shadow">o</div>
            </div>
            <div className="wrapper">
              <div id="r" className="letter">
                n
              </div>
              <div className="shadow">n</div>
            </div>
          </div>
          {/*  */}
          <div className="wrapper">
            <div id="space2" className="letter">
              {" "}
            </div>
            <div className="shadow"> </div>
          </div>
          <div className="flex">
            <div className="wrapper ">
              <div id="W" className="letter">
                M
              </div>
              <div className="shadow">M</div>
            </div>
            <div className="wrapper">
              <div id="e1" className="letter">
                a
              </div>
              <div className="shadow">a</div>
            </div>
            <div className="wrapper">
              <div id="l1" className="letter">
                k
              </div>
              <div className="shadow">k</div>
            </div>
            <div className="wrapper">
              <div id="c" className="letter">
                e
              </div>
              <div className="shadow">e</div>
            </div>
            <div className="wrapper">
              <div id="o" className="letter">
                r
              </div>
              <div className="shadow">r</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedText;
