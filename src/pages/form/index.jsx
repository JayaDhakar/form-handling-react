import React, { useState, useEffect } from 'react';
import {
    Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField,
    FormControl, InputLabel, Select, MenuItem, FormHelperText, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Draggable from 'react-draggable';
import { useTheme } from '@mui/material/styles';

import CustomTextField from '../../components/textfield';
import CustomAutocomplete from '../../components/Autocomplete';
import FileUpload from '../../components/FileUpload';
import MultiSelectChip from '../../components/multiselectChip';
import CustomRadioGroup from '../../components/radiogroup';
import { Country, State, City } from 'country-state-city';
import { useNavigate } from 'react-router-dom';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function PaperComponent(props) {
    const nodeRef = React.useRef(null);
    return (
        <Draggable
            nodeRef={nodeRef}
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <div ref={nodeRef} {...props} />
        </Draggable>
    );
}

const FormHandle = ({ setFormState }) => {

    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contactNo: '',
        gender: '',
        country: '',
        state: '',
        city: '',
        githubUrl: '',
        branch: [],
        skills: [],
        resume: null,
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const [countries, setCountries] = useState(Country.getAllCountries());
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);

    // const [countries, setCountries] = useState([]);
    // const [states, setStates] = useState([]);
    // const [cities, setCities] = useState([]);
    // const [selectedCountry, setSelectedCountry] = useState('');
    // const [selectedState, setSelectedState] = useState('');
    // const [selectedCity, setSelectedCity] = useState('');




    const [branches, setBranches] = useState(['CSE', 'ECE', 'MECH.', 'IT']);
    const skillOptions = ['React', 'Node.js', 'CSS', 'TypeScript'];

    const handleClickOpen = () => {
        console.log('Opening form...');
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCountryChange = (country) => {
        setSelectedCountry(country);
        setFormData(prev => ({
            ...prev,
            country: country.isoCode,
            state: '',
            city: '',
        }));
        setStates(State.getStatesOfCountry(country.isoCode));
        setCities([]);
    }

    const handleStateChange = (state) => {
        setSelectedState(state);
        setFormData(prev => ({
            ...prev,
            state: state.isoCode,
            city: '',
        }));
        setCities(City.getCitiesOfState(selectedCountry.isoCode, state.isoCode));

    }
    const handleGenderChange = (e) => {
        setFormData(prev => ({ ...prev, gender: e.target.value }));
    };

    const handleBranchChange = (event, newValue) => {
        setBranches(newValue)
        setFormData(prev => ({ ...prev, branch: newValue }));
    };

    const handleSkillsChange = (event) => {
        const {
            target: { value },
        } = event;
        setFormData(prev => ({
            ...prev,
            skills: typeof value === 'string' ? value.split(',') : value,
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, resume: e.target.files[0] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = {};

        if (!formData.name) validationErrors.name = "Name is required";
        if (!formData.email) validationErrors.email = "Email is required";
        if (!formData.country) validationErrors.country = "Country is required";
        if (!formData.state) validationErrors.state = "State is required";
        if (!formData.city) validationErrors.city = "City is required";

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);

        const submissionData = {
            ...formData,
            githubUrl: formData.githubUrl ? `https://github.com/${formData.githubUrl}` : '',
        };
        setFormState(submissionData);

        navigate('/displayForm');

        console.log("Form submitted:", submissionData);


        setTimeout(() => {
            setLoading(false);
            setFormData({
                name: '',
                email: '',
                contactNo: '',
                gender: '',
                country: '',
                state: '',
                city: '',
                githubUrl: '',
                branch: [],
                skills: [],
                resume: null,
            });
            setErrors({});
            setOpen(false);
        }, 1000);
    };


    // useEffect(() => {

    //     fetch('https://api.countrystatecity.in/v1/countries', { headers: { 'X-CSCAPI-KEY': 'YOUR_API_KEY' } })
    //         .then(response => response.json())
    //         .then(data => setCountries(data))
    //         .catch(error => console.error('Error fetching countries:', error));
    // }, []);

    // useEffect(() => {

    //     if (selectedCountry) {
    //         fetch(`https://api.countrystatecity.in/v1/countries/${selectedCountry}/states`, { headers: { 'X-CSCAPI-KEY': 'YOUR_API_KEY' } })
    //             .then(response => response.json())
    //             .then(data => setStates(data))
    //             .catch(error => console.error('Error fetching states:', error));
    //     } else {
    //         setStates([]);
    //     }
    //     setCities([]);
    //     setSelectedState('');
    //     setSelectedCity('');
    // }, [selectedCountry]);

    // useEffect(() => {

    //     if (selectedState) {
    //         fetch(`https://api.countrystatecity.in/v1/countries/${selectedCountry}/states/${selectedState}/cities`, { headers: { 'X-CSCAPI-KEY': 'YOUR_API_KEY' } })
    //             .then(response => response.json())
    //             .then(data => setCities(data))
    //             .catch(error => console.error('Error fetching cities:', error));
    //     } else {
    //         setCities([]);
    //     }
    //     setSelectedCity('');
    // }, [selectedState]);
    useEffect(() => {
        // Fetch countries, states, and cities from API
        // Example:
        // fetchCountries().then(data => setCountries(data));
    }, []);

    useEffect(() => {
        if (formData.country) {
            // Fetch states based on selected country
            // Example:
            // fetchStates(formData.country).then(data => setStates(data));
        }
    }, [formData.country]);

    useEffect(() => {
        if (formData.state) {
            // Fetch cities based on selected state
            // Example:
            // fetchCities(formData.state).then(data => setCities(data));
        }
    }, [formData.state]);

    // console.log(countries)

    return (
        <>
            <div className="flex items-center justify-center min-h-screen">
                <Button variant="outlined" onClick={handleClickOpen}>Open Form</Button>
            </div>

            <Dialog open={open} onClose={handleClose} PaperComponent={PaperComponent} PaperProps={{
                sx: {
                    backgroundColor: 'white',
                    color: 'black',

                },
            }}>
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Form
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                        sx={{ position: 'absolute', right: 8, top: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <form onSubmit={handleSubmit}>

                    <DialogContent >
                        <div >

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                <CustomTextField
                                    required
                                    label="Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    error={!!errors.name}
                                    helperText={errors.name}
                                        errors={errors.name}
                                />

                                <CustomTextField
                                    required
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                />

                                <CustomTextField
                                    label="Contact No"
                                    name="contactNo"
                                    value={formData.contactNo}
                                    onChange={handleChange}
                                    inputProps={{ maxLength: 10 }}
                                    error={!!errors.contactNo}
                                    helperText={errors.contactNo}
                                />

                                <CustomRadioGroup
                                    value={formData.gender}
                                    onChange={handleGenderChange}
                                    errors={errors}
                                />


                                <FormControl fullWidth error={!!errors.country}>
                                    <InputLabel id="country-label">Country</InputLabel>
                                    <Select
                                        labelId="country-label"
                                        name="country"
                                        value={formData.country}
                                        onChange={(e) => {
                                            const country = countries.find(c => c.isoCode === e.target.value);
                                            handleCountryChange(country);
                                        }}
                                        label="Country"
                                    >
                                        {countries.map(country => (
                                            <MenuItem key={country.isoCode} value={country.isoCode}>
                                                {country.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.country && <FormHelperText>{errors.country}</FormHelperText>}
                                </FormControl>

                                <FormControl fullWidth error={!!errors.state}>
                                    <InputLabel id="state-label">State</InputLabel>
                                    <Select
                                        labelId="state-label"
                                        name="state"
                                        value={formData.state}
                                        onChange={(e) => {
                                            const state = states.find(s => s.isoCode === e.target.value);
                                            handleStateChange(state);
                                        }}
                                        label="State"
                                        disabled={!formData.country}
                                    >
                                        {states.map(state => (
                                            <MenuItem key={state.isoCode} value={state.isoCode}>
                                                {state.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.state && <FormHelperText>{errors.state}</FormHelperText>}
                                </FormControl>

                                <FormControl fullWidth error={!!errors.city}>
                                    <InputLabel id="city-label">City</InputLabel>
                                    <Select
                                        labelId="city-label"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        label="City"
                                        disabled={!formData.state}
                                    >
                                        {cities.map(city => (
                                            <MenuItem key={city.name} value={city.name}>
                                                {city.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.city && <FormHelperText>{errors.city}</FormHelperText>}
                                </FormControl>

                                <CustomAutocomplete
                                    options={branches}
                                    value={formData.branch}
                                    label={"Branch"}
                                    onChange={handleBranchChange}
                                    getOptionLabel={(option) => typeof option === 'string' ? option : ''}
                                    renderInput={(params) => <TextField {...params} label="Branch" variant="standard" />}
                                />

                                <MultiSelectChip
                                    selectedSkills={formData.skills}
                                    handleChange={handleSkillsChange}
                                    options={skillOptions}
                                    MenuProps={MenuProps}
                                />

                                <FileUpload onChange={handleFileChange} />
                                {/* <GitHubUrl
                                    value={formData.githubUrl}
                                    onChange={handleChange}
                                    error={errors.githubUrl}
                                    helperText={errors.githubUrl}
                                /> */}
                            </div>
                        </div>
                    </DialogContent>

                    <DialogActions>
                        {/* <Button onClick={handleClose}>Cancel</Button> */}
                        <Button type="submit" variant="contained" color="primary" disabled={loading}>
                            Submit
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};

export default FormHandle;