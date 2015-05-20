describe('Unit: StateService', function () {

    var service, findStates, $location;

    beforeEach(module('orchard.state-service'));

    beforeEach(inject(function (StateService, _$location_) {  
        findStates = function (name) {
            var states = [
                    {
                        name: 'dashboard',
                        url: '/'
                    },
                    {
                        name: 'services',
                        url: '/services'
                    }
                ],
                length = states.length;

            for (var i = 0; i < length; i++) {
                if (states[i].name === name) {
                    return states[i];
                }
            };
        };

        service = StateService;
        $location = _$location_;
    }));

    it("change state",
    function () {
        var home = findStates("dashboard");

        spyOn($location, "path");

        service.changeState(home.name);

        expect($location.path).toHaveBeenCalledWith(home.url);
    });
});