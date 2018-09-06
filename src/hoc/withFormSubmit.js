import React from 'react';
import PropTypes from 'prop-types';
import { SubmissionError } from 'redux-form';

function withFormSubmit(Component) {
    return class WithFormSubmit extends React.Component {
        static propTypes = {
            onSubmit: PropTypes.func.isRequired,
        }

        formSubmit = (values) => {
            const res = this.props.onSubmit(values);
            if (!(!!res && (typeof res === 'object' || typeof res === 'function') && typeof res.then === 'function')) {
                throw new Error('Return type should be Promise.');
            }

            return res
                .catch((error) => {
                    if (error.response && error.response.status === 422) {
                        const errors = Object.keys(error.response.data).reduce((errors, fieldName) => {
                            if (fieldName === 'non_field_errors') {
                                errors['_error'] = error.response.data[fieldName];
                            } else {
                                errors[fieldName] = error.response.data[fieldName];
                            }
                            return errors;
                        }, {});
                        throw new SubmissionError(errors);
                    }
                    return error;
                });
        }

        render() {
            const props = {
                ...this.props,
                onSubmit: this.formSubmit,
            };
            return <Component {...props} />;
        }
    };
}

export default withFormSubmit;
