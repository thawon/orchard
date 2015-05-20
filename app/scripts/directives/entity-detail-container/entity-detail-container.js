(function () {

    'use strict';

    angular.module('orchard.entity-detail-container', [
        'orchard.view-modes-constant',
        'orchard.export-service'
    ])
    .directive('pcdEntityDetailContainer', EntityDetailContainerDirective);

    EntityDetailContainerDirective.$inject = [
        'toaster',
        'VIEW_MODES',
        'ExportService'
    ];

    function EntityDetailContainerDirective(toaster, VIEW_MODES, ExportService) {

        return {
            restrict: 'E',
            transclude: true,
            scope: {
                saveFn: '&',
                validateFn: '&',
                cancelFn: '&',
                modeFn: '&'
            },
            link: function (scope, element, attrs) {
                var errorDiv = element.find('.view-detail-error');

                scope.edit = changeMode(VIEW_MODES.edit);
                scope.cancel = cancel;

                scope.save = save(afterSave);

                scope.saveAndClose = save(afterSaveAndClose);
                
                changeMode(scope.modeFn())();

                function afterSave() {
                    changeMode(VIEW_MODES.show)();
                }

                function afterSaveAndClose() {
                    ExportService.history.back();
                }

                function getViews() {
                    var $this = $(element),
                        views = $this.find('.view-detail').find('[data-mode]');

                    return views;
                }

                function changeMode(mode) {
                    return function () {
                        var $this = $(element),
                            views = getViews(),
                            view = $this.find('.view-detail').find("[data-mode='" + mode + "']");

                        $(views).hide();
                        $(view).show();

                        scope.mode = mode;
                    }
                }

                function save(after) {
                    return function () {
                        var waitToastId = 'waitingId',
                            errorToasterId = 'errorId',
                            successtoasterOptions = {
                                type: 'success',
                                body: 'saved successfully',
                                timeout: 2000
                            },
                            waitToasterOptions = {
                                type: 'wait',
                                body: 'saving...',
                                toastId: waitToastId,
                                toasterId: waitToastId
                            },
                            errorToasterOptions = {
                                type: 'error',
                                body: 'saved unsuccessfully'
                            };
                        
                        var error = scope.validateFn();

                        if (error.hasError) {

                            toaster.pop(errorToasterOptions);

                            showErrorMessage(error.Errors);

                            return;
                        }

                        errorDiv.html('');

                        toaster.pop(waitToasterOptions);

                        scope.saveFn()
                            .then(function (saveResult) {
                                toaster.clear(waitToastId, waitToastId);
                                
                                toaster.pop(successtoasterOptions);

                                after();

                                return saveResult;
                            })
                            .catch(function (error) {
                                toaster.clear(waitToastId, waitToastId);

                                toaster.pop(errorToasterOptions);
                                
                                console.log(error);

                                return error;
                            });
                    }
                }

                function cancel() {
                    scope.cancelFn();
                    changeMode(VIEW_MODES.show)();
                }

                function showErrorMessage(errors) {
                    var message = errors.join('</br>');

                    errorDiv.html(message);
                }

            },
            templateUrl: 'scripts/directives/entity-detail-container/entity-detail-container.html'
        }
        
    }
}());