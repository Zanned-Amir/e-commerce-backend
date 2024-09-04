
export default function getRequestData(source: any , value: any , defaultValue: any = null) {
          return source[value] ? source[value] : defaultValue;
}


