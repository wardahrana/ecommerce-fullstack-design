import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const EMPTY_FORM = {
    title: '',
    price: '',
    oldPrice: '',
    image: '', // URL or data URL
};

const formatBytes = (bytes) => {
    if (!bytes) return '';
    const units = ['B', 'KB', 'MB'];
    let i = 0;
    let val = bytes;
    while (val >= 1024 && i < units.length - 1) {
        val /= 1024;
        i++;
    }
    return `${val.toFixed(1)} ${units[i]}`;
};

const AdminProductForm = ({ onSubmit, editingProduct, onCancel }) => {
    const [form, setForm] = useState(EMPTY_FORM);
    const [imagePreview, setImagePreview] = useState('');
    const [fileMeta, setFileMeta] = useState(null); // { name, size }
    const [isDragging, setIsDragging] = useState(false);
    const [isReading, setIsReading] = useState(false);
    const [progress, setProgress] = useState(0);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (editingProduct) {
            setForm({
                title: editingProduct.title || '',
                price: editingProduct.price?.toString() ?? '',
                oldPrice: editingProduct.oldPrice?.toString() ?? '',
                image: editingProduct.image || '',
            });
            setImagePreview(editingProduct.image || '');
            if (editingProduct.image) {
                setFileMeta({ name: 'Current image', size: 0 });
            }
        } else {
            setForm(EMPTY_FORM);
            setImagePreview('');
            setFileMeta(null);
        }
    }, [editingProduct]);

    const handle = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        if (name === 'image') {
            // treat pasted URL as preview
            setImagePreview(value);
            setFileMeta(value ? { name: 'URL', size: 0 } : null);
        }
    };

    const readFileAsDataURL = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onerror = () => reject(new Error('File read error'));
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(file);
        });

    // handle file selection
    const handleFileChange = async (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        await processFile(file);
    };

    // drag/drop handlers
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };
    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };
    const handleDrop = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const file = e.dataTransfer.files && e.dataTransfer.files[0];
        if (!file) return;
        await processFile(file);
    };

    // process file and create preview (shows spinner & simulated progress)
    const processFile = async (file) => {
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file.');
            return;
        }
        setIsReading(true);
        setProgress(0);
        setFileMeta({ name: file.name, size: file.size });

        // simulate progress so user sees micro-interaction (actual Read is async)
        const simInterval = 20;
        let simulated = 0;
        const simTimer = setInterval(() => {
            simulated += Math.random() * 6 + 4; // increase by 4-10%
            setProgress(Math.min(90, Math.floor(simulated)));
        }, simInterval);

        try {
            const dataUrl = await readFileAsDataURL(file);
            clearInterval(simTimer);
            // finish progress
            setProgress(100);
            // short timeout to let progress bar reach 100%
            setTimeout(() => {
                setIsReading(false);
                setForm((prev) => ({ ...prev, image: dataUrl }));
                setImagePreview(dataUrl);
            }, 180);
        } catch (err) {
            clearInterval(simTimer);
            setIsReading(false);
            setProgress(0);
            alert('Failed to read image. Try another file.');
        }
    };

    const removeImage = () => {
        setForm((prev) => ({ ...prev, image: '' }));
        setImagePreview('');
        setFileMeta(null);
        setProgress(0);
        // reset native input so same file can be selected again if needed
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.title.trim() || !form.price) return;

        const product = {
            title: form.title.trim(),
            price: parseFloat(form.price),
            oldPrice: form.oldPrice ? parseFloat(form.oldPrice) : null,
            image: form.image || '',
        };

        onSubmit && onSubmit(product);

        if (!editingProduct) {
            setForm(EMPTY_FORM);
            setImagePreview('');
            setFileMeta(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const inputClass = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-400 transition-colors';
    const labelClass = 'block text-xs font-medium text-gray-500 mb-1';

    return (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">{editingProduct ? 'Edit Product (basic)' : 'Add Product (basic)'}</h2>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4">

                    <div>
                        <label className={labelClass}>Product Title *</label>
                        <input name="title" value={form.title} onChange={handle} required placeholder="e.g. Nike Sport Watch" className={inputClass} />
                    </div>

                    <div>
                        <label className={labelClass}>Price (USD) *</label>
                        <input name="price" value={form.price} onChange={handle} required type="number" step="0.01" placeholder="12.99" className={inputClass} />
                    </div>

                    <div>
                        <label className={labelClass}>Old Price (optional)</label>
                        <input name="oldPrice" value={form.oldPrice} onChange={handle} type="number" step="0.01" placeholder="18.00" className={inputClass} />
                    </div>

                    {/* Image URL input */}
                    <div>
                        <label className={labelClass}>Image URL (or upload)</label>
                        <input name="image" value={form.image} onChange={handle} placeholder="Paste image URL here..." className={inputClass} />
                    </div>

                    {/* Custom Upload / Dropzone */}
                    <div>
                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    fileInputRef.current?.click();
                                }
                            }}
                            className={`mt-2 border-2 ${isDragging ? 'border-blue-400 bg-blue-50' : 'border-dashed border-gray-200 bg-white'} rounded-lg p-4 flex items-center gap-4 cursor-pointer transition-colors focus:outline-none`}
                            aria-label="Upload product image"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <div className="flex items-center gap-3 w-full">
                                <div className="flex-shrink-0">
                                    <motion.div whileHover={{ scale: 1.05 }} className="w-14 h-14 rounded-md bg-gradient-to-br from-blue-50 to-white border border-gray-100 flex items-center justify-center">
                                        {/* simple upload icon (SVG) */}
                                        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M7 10l5-5 5 5M12 5v12" />
                                        </svg>
                                    </motion.div>
                                </div>

                                <div className="flex-1">
                                    <div className="text-sm font-medium text-gray-700">Drag & drop image here or click to browse</div>
                                    <div className="text-xs text-gray-400 mt-1">PNG, JPG, GIF — max 5MB</div>

                                    {/* file meta / preview */}
                                    {isReading && (
                                        <div className="mt-3">
                                            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                                <div className="h-2 bg-blue-500 transition-all" style={{ width: `${progress}%` }} />
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">Preparing image…</div>
                                        </div>
                                    )}

                                    {!isReading && imagePreview && (
                                        <div className="mt-3 flex items-center justify-between gap-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-14 h-10 bg-gray-50 rounded-md overflow-hidden flex items-center justify-center border">
                                                    <img src={imagePreview} alt="preview" className="max-h-full object-contain" onError={(e) => (e.currentTarget.style.display = 'none')} />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-gray-700">{fileMeta?.name || 'Image'}</div>
                                                    {fileMeta?.size ? <div className="text-xs text-gray-400">{formatBytes(fileMeta.size)}</div> : null}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <button type="button" onClick={removeImage} className="text-xs text-red-500 hover:underline">
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {!isReading && !imagePreview && (
                                        <div className="mt-3 text-xs text-gray-400">No image selected</div>
                                    )}
                                </div>
                            </div>

                            {/* native input (hidden) */}
                            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                        </div>
                    </div>

                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="bg-blue-500 text-white font-medium px-6 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors">
                        {editingProduct ? 'Save' : 'Add'}
                    </motion.button>

                    {editingProduct && onCancel && (
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="button" onClick={onCancel} className="border border-gray-200 text-gray-600 font-medium px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                            Cancel
                        </motion.button>
                    )}
                </div>
            </form>
        </motion.div>
    );
};

export default AdminProductForm;