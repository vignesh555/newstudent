//phone directive added newly
angular.module("studentApp")
    .directive("phoneformat", fnPhoneformat);


function fnPhoneformat() {
        return {
            restrict: "A",
            require: "ngModel",
            link: function (scope, element, attr, ngModelCtrl) {
                var phoneParse = function (value) {
                    var numbers = value && value.replace(/-/g, "");
                    if (/^\d{10}$/.test(numbers)) {
                        return numbers;
                    }
                        
                    return undefined;
                }
                var phoneFormat = function (value) {
                    var numbers = value && value.replace(/-/g,"");
                    var matches = numbers && numbers.match(/^(\d{3})(\d{3})(\d{4})$/);
                    
                    if (matches) {
                        return matches[1] + "-" + matches[2] + "-" + matches[3];
                    }

                    return undefined;
                }
               ngModelCtrl.$parsers.push(phoneParse);
               ngModelCtrl.$formatters.push(phoneFormat);
                
                element.bind("blur", function () {
                    var value = phoneFormat(element.val());
                    var isValid = !!value;
                    if (isValid) {
                        ngModelCtrl.$setViewValue(value);
                        ngModelCtrl.$render();
                    }
                    
                    ngModelCtrl.$setValidity("telephone", isValid);
                    scope.$apply();
                });
            }
        };
});
