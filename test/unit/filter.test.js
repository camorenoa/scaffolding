/* jshint ignore:start */
'use strict';

describe("Filter component", function() {

  var controller;
  var scope;
  var data = readJSON('test/fixture/data.json');
  var filter;
  var dataMapped;
  var tableHeader = [
    { field: "approach", title: "Approach", show: true },
    { field: "unit", title: "Units", show: true },
    { field: "nav", title: "NAV/Units", show: true },
    { field: "marketValue", title: "Market value", show: true },
    { field: "currency", title: "Currency", show: true },
    { field: "assetPercentage", title: "Total assets", show: true }
  ];

  /** Angular logic */
  beforeEach(module('sapient.filter'));
  beforeEach(module('sapient.market'));
  beforeEach(function(){
    inject(function ($filter) {
      filter = $filter;
    });
  });
  beforeEach(inject(function(MarketFactory){
    dataMapped = MarketFactory.mappingData(data);
  }));
  describe('cases', function(){
    describe('customCurrency functionality', function(){
      it("customCurrency by USD", function () {
        var result = filter('customCurrency')(dataMapped, 'USD');
        result = result.filter(function(value){
          return value.currency;
        });
        expect(result.length > 0).toBe(true);
        expect(result[0].currency).toBe('USD');
      });
      it("customCurrency by EUR", function () {
        var result = filter('customCurrency')(dataMapped, 'EUR');
        result = result.filter(function(value){
          return value.currency;
        });
        expect(result.length > 0).toBe(true);
        expect(result[0].currency).toBe('EUR');
      });
    });
    describe('customColumns functionality', function(){
      it("customCurrency by unit", function () {
        tableHeader[1].show = false;
        var result = filter('customColumns')(dataMapped, tableHeader, dataMapped);
        expect(result.length > 0).toBe(true);
        expect(result[0].unit).toBe(undefined);
      });
      it("customCurrency by nav", function () {
        tableHeader[2].show = false;
        var result = filter('customColumns')(dataMapped, tableHeader, dataMapped);
        expect(result.length > 0).toBe(true);
        expect(result[0].unit).toBe(undefined);
      });
    });
  }); 
  describe('functionality', function () {
    it('has a customCurrency filter', function() {
      expect(filter('customCurrency')).not.toBeNull();
    });
    it('has a customOrderBy filter', function() {
      expect(filter('customOrderBy')).not.toBeNull();
    });
    it('has a range filter', function() {
      expect(filter('customOrderBy')).not.toBeNull();
    });
  });
});