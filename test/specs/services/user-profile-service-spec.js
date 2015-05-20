describe('Unit: UserProfileService', function () {

    var service, $httpBackend;

    beforeEach(module('breeze.angular', 'pineappleclub.user-profile-service'));

    beforeEach(inject(function (breeze, UserProfileService, _$httpBackend_) {
        $httpBackend = _$httpBackend_;

        service = UserProfileService;
    }));

    //it("get user",
    //function () {
    //    var url = "api/Users?$filter=_id%20eq%20'1'&",
    //        data = {
    //            _id: 1,
    //            firstname: "valid first name"
    //        };

    //    $httpBackend.when('GET', url)
    //         .respond(data);

    //    service.getUser(1);

    //    $httpBackend.flush();

    //    // nothing to assert! this is just a prove of concept of breezejs test
    //});
});