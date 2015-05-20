/**
 * Fill metadataStore with metadata, crafted by hand using
 * Breeze Labs: breeze.metadata.helper.js
 * @see http://www.breezejs.com/documentation/metadata-by-hand
 */
(function() {
    'use strict';

    angular.module("pineappleclub.meta-data", [
        'pineappleclub.user-model'
    ])
    .factory('metadata', Metadata);

    Metadata.$inject = [
        'UserModelService'
    ];

    function Metadata(UserModelService) {
        return {
            createMetadataStore: createMetadataStore
        };
        /////////////////////
        function createMetadataStore() {

            var namingConvention = createNamingConvention();

            var store = new breeze.MetadataStore({ namingConvention: namingConvention });

            fillMetadataStore(store, UserModelService);

            return store;
        }

        function createNamingConvention() {
            // Translate certain property names between MongoDb names and client names
            var convention = new breeze.NamingConvention({
                serverPropertyNameToClient: function(serverPropertyName) {
                    switch (serverPropertyName) {
                        case '_id':   return 'id';
                        default: return serverPropertyName;
                    }
                },
                clientPropertyNameToServer: function(clientPropertyName) {
                    switch (clientPropertyName) {
                        case 'id':   return '_id';
                        default: return clientPropertyName;
                    }
                }
            });
            return convention;
        }

        function fillMetadataStore(store, UserModelService) {
            // Using Breeze Labs: breeze.metadata.helper.js
            // https://github.com/IdeaBlade/Breeze/blob/master/Breeze.Client/Scripts/Labs/breeze.metadata-helper.js
            // The helper reduces data entry by applying common conventions
            // and converting common abbreviations (e.g., 'type' -> 'dataType')

            // 'None' (client-generated) is the default key generation strategy for this app
            var keyGen = breeze.AutoGeneratedKeyType.None;

            // namespace of the corresponding classes on the server
            var namespace = 'Pineapple.Model';

            var helper = new breeze.config.MetadataHelper(namespace, keyGen);

            /*** Convenience fns and vars ***/

            // addType - make it easy to add the type to the store using the helper
            var addType = function (type) { helper.addTypeToStore(store, type); };
            
            addType(UserModelService.getType());

        }
    }

}());