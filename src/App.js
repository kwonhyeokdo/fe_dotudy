import './App.css';
import LabelManagement from './dotudy/system/LabelManagement';
import Signin from './dotudy/sign/Signin';
import {IntlProvider} from "react-intl";
import Header from "./dotudy/Header";
import Footer from "./dotudy/Footer";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Signup from 'dotudy/sign/Signup';
import Home from 'dotudy/Home';

const locale = "ko";
// const locale = "en";
const messages = {
    "ko": {
        "labelManageMent.title" : "라벨관리",
        "labelManageMent.codeAndLabel": "라벨코드, 라벨명",
        "signup.title" : "회원가입",
        "signup.id" : "ID",
        "signup.password" : "password",
        "signup.passwordConfirm" : "password 확인",
        "signup.nickname" : "별명",
        "signup.email" : "이메일",
        "signup.id.error.message" : "영문, 숫자 조합 5~20자로 만들어주세요.",
        "signup.password.error.message" : "영문, 숫자, 특수문자 조합 7~20자로 만들어주세요.",
        "signup.passwordConfirm.error.message" : "비밀번호와 같지 않습니다.",
        "signup.nickname.error.message" : "영문, 숫자 조합 2~10자로 만들어주세요.",
        "signup.email.error.message" : "옳바른 이메일 형식이 아닙니다.",
        "system.error" : "ERROR 관리자에게 문의하세요.",
        "signup.reg.error.message1" : "매개변수 regArray가 잘못 되었습니다.",
        "signup.reg.error.message2" : "매개변수 regArray의 reg가 RegExp의 instance가 아닙니다.",
        "signup.signup" : "회원가입",
        "signin.title" : "DOTUDY",
        "signin.id" : "ID",
        "signin.password" : "Password",
        "signin.signin" : "로그인",
        "signin.signup" : "회원가입",
        "signin.find.id" : "아이디 찾기",
        "signin.find.password" : "비밀번호 찾기"
    },
    "en": {
        "labelManageMent.title" : "(en)라벨관리",
        "labelManageMent.codeAndLabel": "(en)라벨코드, 라벨명",
        "signup.title" : "(en)회원가입",
        "signup.id" : "(en)ID",
        "signup.password" : "(en)password",
        "signup.passwordConfirm" : "(en)password 확인",
        "signup.nickname" : "(en)별명",
        "signup.email" : "(en)이메일",
        "signup.id.error.message" : "(en)영문, 숫자 조합 5~20자로 만들어주세요.",
        "signup.password.error.message" : "(en)영문, 숫자, 특수문자 조합 5~20자로 만들어주세요.",
        "signup.passwordConfirm.error.message" : "(en)비밀번호와 같지 않습니다.",
        "signup.nickname.error.message" : "(en)특수문자는 사용할 수 없습니다.",
        "signup.email.error.message" : "(en)옳바른 이메일 형식이 아닙니다."
    }
}

function App() {
    const _style = {
        width: "100vw"
    }
    return (
        <IntlProvider locale={locale} messages={messages[locale]}>
                <div className="App" style={_style}>
                    <BrowserRouter>
                        <Header/>
                        <Routes>
                            <Route path="/" element={<Home/>}></Route>
                            <Route path="/signin" element={<Signin/>}></Route>
                            <Route path="/signup" element={<Signup/>}></Route>
                            <Route path="/labelManagement" element={<LabelManagement/>}></Route>
                        </Routes>
                        <Footer/>
                    </BrowserRouter>
                </div>
        </IntlProvider>
    );
}

export default App;
