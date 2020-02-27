import React, { useCallback } from 'react';

import { createUseStyles } from 'react-jss';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import MomentUtils from '@date-io/moment';
import { Typography } from '@wld/ui';
import { useFormikContext } from 'formik';

import { useIsEditing } from '../../../../../hooks/use_is_editing';
import { styles } from './project_dialog_content_date_styles';

import { YearMonth } from '../../../../../commons/year_month/year_month';

const useStyles = createUseStyles(styles);

const ProjectDialogContentDateComponent = ({ date }) => {
    const [isEditing] = useIsEditing();
    const classes = useStyles({ isEditing });
    return (
        <div className={classes.container}>
            <Content date={date} isEditing={isEditing} classes={classes} />
        </div>
    );
};

const Content = ({ date, isEditing, classes }) => {
    if (isEditing) {
        return <EditingContent title={date} classes={classes} />;
    }
    return <DefaultContent title={date} classes={classes} />;
};

const DefaultContent = ({ date, classes }) => (
    <Typography variant="h2" component="h3" customClasses={{ container: classes.typography }}>
        {date && date.format('LL')}
    </Typography>
);

const EditingContent = ({ classes }) => {
    const { setFieldValue, values, errors } = useFormikContext();
    const handleStartDate = useCallback(value => {
        setFieldValue('date', value);
    }, []);
    return (
        <>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <YearMonth
                    textfieldProps={{
                        fullWidth: true
                    }}
                    className={classes.datePicker}
                    variant="flat"
                    value={values.date}
                    onChange={handleStartDate}
                    title={{ id: 'Project.editDialog.date', defaultMessage: 'Date Du projet' }}
                    error={errors?.date}
                />
            </MuiPickersUtilsProvider>
            {errors?.name && (
                <Typography color="danger" variant="helper" component="p">
                    {errors.name}
                </Typography>
            )}
        </>
    );
};

export const ProjectDialogContentDate = ProjectDialogContentDateComponent;