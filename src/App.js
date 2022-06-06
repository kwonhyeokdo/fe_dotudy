import './App.css';
import LabelManagement from './dotudy/system/LabelManagement';
import {IntlProvider} from "react-intl";

const locale = "ko";
// const locale = "en";
const messages = {
    "ko": {
        "labelManageMent.title" : "라벨관리"
    },
    "en": {
        "labelManageMent.title" : "Label ManageMent"
    }
}

function App() {
    const _style = {
        width: "100vw"
    }
    return (
        <IntlProvider locale={locale} messages={messages[locale]}>
            <div className="App" style={_style}>
                <LabelManagement/>
            </div>
        </IntlProvider>
    );
}

export default App;
