
type createInputValidatorI = (value: string) => {
    value: string
    isValid: boolean
}
export function createInputValidator(props: createInputValidatorI) {
    return props
}