import React from "react";
import { GiBookshelf } from "react-icons/gi";
import InfoCardDirectional from "../../giving/security-donations/info-card-directional";
import { BsCardChecklist } from "react-icons/bs";
import { MdOutlineRoomService } from "react-icons/md";

const AboutView = () => {
  return (
    <section>
      <div className="container">
        <div className="my-12">
          <InfoCardDirectional
            title="Welcome To The Asbury Library"
            content="Asbury’s library supports the congregation of Asbury United Methodist Church as we worship God and serve others. The library provides a well rounded collection of books and other media to help individuals of all ages grow in the understanding of their faith and their full potential as children of God. Asbury’s library is located in the northeast corner of the building."
            icon={<GiBookshelf size={150} className="text-seaFoam-800" />}
          />
        </div>
      </div>

      <div className="container">
        <h1 className="mt-16 text-3xl uppercase text-center text-seaFoam-500">
          Our collection
        </h1>
        <hr className="mt-6" />
        <p className="text-center text-xl leading-loose my-10">
          We currently have more than 4,300 fiction and non-fiction books, audio
          tapes, video cassettes, and compact discs available for check out. We
          have 16 different translations of the Bible, Bible commentaries and
          dictionaries, books about religious history, prayer, Christian living
          and Methodism. We also have books about social concerns, health,
          parenting, arts and crafts, poetry, history, and biographies. The
          library supports the United Methodist Women’s Reading Program and has
          a book cart that holds the collection. We have most of the Caldecott
          and Newbery Award winning books for children as well as children’s
          Bibles, Bible stories and plenty of books just for fun.
        </p>
        <hr className="mt-6 mb-12" />
      </div>

      <div className="container">
        <InfoCardDirectional
          title="Services"
          content="This is a self-service library, you may visit anytime the building is open. The alphabetical card catalog is useful to locate the book you want or use search form below. The non-fiction books are arranged on the shelf using the Dewey Decimal system. Fiction books are shelved by the author’s last name. Adult books are around the outside walls with large print books, audio tapes and video cassettes on the north wall. Children’s books are on the low shelves in the middle of the room."
          icon={
            <MdOutlineRoomService size={150} className="text-seaFoam-700" />
          }
        />
      </div>
      <div className="container my-20">
        <InfoCardDirectional
          title="Procedures"
          content="To check out a book, remove the card from the pocket in the back of the book, write today’s date and your name in the space provided on the card, place the card in the file box and enjoy your book. A librarian is usually in the library to help you during the Sunday School hour and on Thursday mornings. Please return books within two weeks so others may enjoy them. Place returned books on the book return shelf near the librarian’s desk or in the book return box on the UMW book cart."
          icon={<BsCardChecklist size={150} className="text-seaFoam-700" />}
        />
      </div>
    </section>
  );
};

export default AboutView;
