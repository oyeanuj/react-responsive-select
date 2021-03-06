import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Formik } from "formik";
import * as Yup from "yup";

import RRS, { IOutputSingleSelect } from '../../ReactResponsiveSelect';
import { withStoryBookInfo } from '../../utils/withStoryBookInfo';
import { CaretIcon, ErrorIcon } from '../components/Icons';

import '../../ReactResponsiveSelect.css';
import '../stories.css';
import './using-formik.css';

storiesOf('Recipes', module).add(
    `Using RRS with Formik`,
    withStoryBookInfo()(() => (
        <Formik
            initialValues={{
                car: "lexus"
            }}
            onSubmit={(values, { setSubmitting }) => {
                // Mimic sending to an endpoint
                setTimeout(() => {
                    setSubmitting(false);
                    alert(JSON.stringify(values, null, 2));
                }, 2000);
            }}
            validationSchema={
                Yup.object().shape({
                    car: Yup.mixed().notOneOf(["null"], "Please select a car")
                })
            }
        >
            {props => {
                const {
                    values,
                    touched,
                    errors,
                    dirty,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    handleReset
                } = props;

                return (
                    <form onSubmit={handleSubmit}>
                        <p>Trigger an error by selecting "Any"</p>
                        <div className={errors.car && touched.car ? "has-error" : "" }>
                            <RRS
                                name="car"
                                selectedValue={values.car}
                                options={[
                                    {value: "null", text: "Any" },
                                    { value: "alfa-romeo", text: "Alfa Romeo" },
                                    { value: "bmw", text: "BMW" },
                                    { value: "fiat", text: "Fiat" },
                                    { value: "lexus", text: "Lexus" },
                                    { value: "morgan", text: "Morgan" },
                                    { value: "subaru", text: "Subaru" }
                                ]}
                                caretIcon={<CaretIcon key="car-caret" />}
                                onChange={({ value, name }: IOutputSingleSelect): void => {
                                    handleChange({ target: { value, name }});
                                }}
                                onBlur={({ value, name }: IOutputSingleSelect): void => {
                                    handleBlur({ target: { value, name } });
                                }}
                            />
                            {errors.car && touched.car && (
                                <div className="field-error-message"><ErrorIcon /> {errors.car}</div>
                            )}
                        </div>
                        
                        <div>
                            <button
                                type="button"
                                className="outline"
                                onClick={handleReset}
                                disabled={!dirty || isSubmitting}
                            >
                                Reset
                            </button>

                            <button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? '...' : 'Submit'}
                            </button>
                        </div>
                        
                        <div>
                            <pre>
                                {/* <code>{JSON.stringify(props, null, 2)}</code> */}
                            </pre>
                        </div>
                    </form>
                );
            }}
        </Formik>
    )),
);
