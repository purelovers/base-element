import "../style/base.css"
import { h, render } from "preact"
import { getUserConfig, updateUserConfig } from "src/util/userConfig"
import { useLayoutEffect, useState } from "preact/hooks"
import PromptEditor from "src/components/promptEditor"
import { getTranslation, localizationKeys, setLocaleLanguage } from "src/util/localization"
import NavBar from "src/components/navBar"
import APIE