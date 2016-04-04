angular.module('sg.message').run(['gettextCatalog', function (gettextCatalog) {
/* jshint -W100 */
    gettextCatalog.setStrings('ko_KR', {"Login Fail":"로그인 실패","Login Success":"로그인 성공","Signup Fail":"회원 가입 실패","Signup Success":"가입 성공","User Email Duplicated":"중복된 이메일입니다"});
/* jshint +W100 */
}]);