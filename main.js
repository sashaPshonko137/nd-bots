const { Worker } = require('worker_threads');

async function runWorkers(filePaths) {
    const results = [];
    
    // Создаем промисы для каждого воркера
    const promises = filePaths.map((filePath, index) => {
        return new Promise((resolve, reject) => {
            const worker = new Worker(filePath);
            
            worker.on('message', (result) => {
                results[index] = { file: filePath, result: result, success: true };
                resolve();
            });
            
            worker.on('error', (error) => {
                results[index] = { file: filePath, error: error.message, success: false };
                resolve(); // Все равно резолвим, чтобы не прерывать другие воркеры
            });
            
            worker.on('exit', (code) => {
                if (code !== 0 && !results[index]) {
                    results[index] = { file: filePath, error: `Exit code: ${code}`, success: false };
                    resolve();
                }
            });
        });
    });
    
    // Ждем завершения всех воркеров
    await Promise.all(promises);
    return results;
}

// Пример использования
const filesToRun = [
    './dj.js',
    // './bar.js', 
    './vhod.js',
    // "radio.js"
];

runWorkers(filesToRun)
    .then(results => {
        console.log('Результаты выполнения:');
        results.forEach(result => {
            if (result.success) {
                console.log(`✓ ${result.file}:`, result.result);
            } else {
                console.log(`✗ ${result.file}: Ошибка -`, result.error);
            }
        });
    })
    .catch(error => {
        console.error('Ошибка запуска воркеров:', error);
    });