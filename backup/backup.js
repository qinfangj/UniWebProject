
/**
 * If the projects selection changes, no need to keep the samples selection.
 * In principle if a project is added, it could just add the new samples to the list,
 * but since the multiple selector is not our implementation, it becomes complicated
 * for not much in return.
 */
// resetSamplesSelection() {
//     console.debug("reset samples select")
//     let samplesFormKey = this.form + formStoreKeys.suffixes.SAMPLES;
//     store.dispatch(changeFormValue(this.props.form, samplesFormKey, []));
// }
//
