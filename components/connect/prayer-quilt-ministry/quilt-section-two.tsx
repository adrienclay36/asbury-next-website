import React from "react";
import QuiltItem from "./quilt-item";
import SectionHeading from "../../ui/section-heading";
import { AiOutlineSearch } from "react-icons/ai";
import { RiScissorsCutLine } from "react-icons/ri";
import { MdInvertColors } from "react-icons/md";
import { BsBox } from "react-icons/bs";
import { GiSewingNeedle } from "react-icons/gi";
import { FaHandsWash } from "react-icons/fa";
import { FiLayers } from "react-icons/fi";
import { GiBowTieRibbon } from "react-icons/gi";
import { FaFileSignature } from "react-icons/fa";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
const QuiltSectionTwo = () => {
  return (
    <SectionHeading title="Making Prayer Quilts">
      <div className="container">
        <div className="grid sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-4">
          <QuiltItem
            title={"Collecting The Fabric"}
            icon={<AiOutlineSearch size={50} />}
          />
          <QuiltItem
            title={"Cutting the fabric and sorting it into like colors"}
            icon={<RiScissorsCutLine size={50} />}
          />
          <QuiltItem
            title={
              "Choosing five colors to put together for the top and a coordinated piece for the back"
            }
            icon={<MdInvertColors size={50} />}
          />
          <QuiltItem
            title={"Assembling cut fabric pieces into a kit"}
            icon={<BsBox size={50} />}
          />
          <QuiltItem
            title={"Sewing the pieces of the top together"}
            icon={<GiSewingNeedle size={50} />}
          />
          <QuiltItem
            title="Washing and ironing pieced tops"
            icon={<FaHandsWash size={50} />}
          />
          <QuiltItem
            title="Sewing together the top, batting, and back"
            icon={<FiLayers size={50} />}
          />
          <QuiltItem title="Tying Bows" icon={<GiBowTieRibbon size={50} />} />
          <QuiltItem
            title="Labeling finished quilts"
            icon={<FaFileSignature size={50} />}
          />
        </div>
        <h1 className="lg:text-4xl md:text-2xl text-xl text-center uppercase text-seaFoam-600 mt-20 mb-12">
          PRAYER QUILT INSTRUCTIONS
        </h1>
        <p className="text-lg text-center mt-16 leading-loose w-11/12 lg:w-3/6 md:w-5/6 mx-auto">
          For the basic pattern you need 5 coordinating fabrics. Cut 18 each
          4-1/2&quot; squares of each material. You will need 90 squares in all.
          Place the squares in the pattern below.{" "}
        </p>{" "}
        <div className="flex flex-1 justify-center items-center my-4">
          <MdOutlineTipsAndUpdates size={25} />
        </div>
        <p className="text-lg text-center mt-4 leading-loose w-11/12 lg:w-3/6 md:w-5/6 mx-auto font-semibold">
          Tip: it is easier to sew each strip and then sew the strips together.
        </p>
        <p className="text-lg text-center mt-6 leading-loose w-11/12 lg:w-3/6 md:w-5/6 mx-auto">
          Then make a quilt sandwich using the completed top, a light weight
          batting in the middle, and a coordinating piece of yarn. Tie the quilt
          in the corner of each square with the yarn, making a bow. The bow will
          be untied, prayed upon, and tied back as a knot. Each knot
          representing a prayer said for the recipient.
        </p>
      </div>
    </SectionHeading>
  );
};

export default QuiltSectionTwo;
