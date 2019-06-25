const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const assert = require("assert");
log = console.log;

const { CongregationalPrivilege } = require("../src/models/congregational-privilege");
const { Publisher } = require("../src/models/publisher");

describe("Add Privilege to Publisher", () => {
  xit("Add", done => {
    const privilege = CongregationalPrivilege.findOne({
      name: "Sound System",
    })
      .then(priv => {
        log("=============== save ===============");
        log(priv);

        Publisher.findByIdAndUpdate(
          {
            _id: "5d0771597fde660761612fd5",
          },
          {
            $push: {
              congregationalPrivilege: priv,
            },
          },
        )
          .populate("congregationalPrivilege")
          .then(pub => {
            // assert(pub.congregationalPrivilege[0].name === "Sound System");
            console.log(pub.congregationalPrivilege[0]);
          })
          .catch(error => {
            log(error);
          });
      })
      .catch(error => {
        log(error);
      });

    log("=============== end save ===============");

    done();
  });
});
