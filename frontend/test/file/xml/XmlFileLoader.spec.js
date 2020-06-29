/**
 * Copyright (c) 2019 Micro Logic Corp.
 */
import XmlFileLoader from "../../../src/file/XmlFileLoader";

var chai = require('chai');
var expect = chai.expect;
var chaiFiles = require('chai-files');
chai.use(chaiFiles);
var file = chaiFiles.file;

var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('XmlFileLoader', function() {
    describe("open file with old version specification", function(){
        it('test file 2D Enclosure Lid.emsx', function(done){
            let fl = new XmlFileLoader();

            let content = file('./test_data/2D Enclosure Lid.emsx').content;
            fl.convertDataToDocument(content).then(
                function (doc) {
                    expect(doc._elements).to.have.lengthOf(5);
                    done();
                },
                function (err) {
                    done(err);
                }
            );
        })
    })
});