package worker_tuner

import (
	"go.temporal.io/sdk/contrib/sysinfo"
	"go.temporal.io/sdk/worker"
)

// @@@SNIPSTART go-resource-based-tuner
func resourceBasedTuner() (worker.Options, error) {
	tuner, err := worker.NewResourceBasedTuner(worker.ResourceBasedTunerOptions{
		TargetMem:    0.8,
		TargetCpu:    0.9,
		InfoSupplier: sysinfo.SysInfoProvider(),
	})
	if err != nil {
		return worker.Options{}, err
	}
	return worker.Options{
		Tuner: tuner,
	}, nil
}

// @@@SNIPEND

// @@@SNIPSTART go-composite-tuner
func compositeTuner() (worker.Options, error) {
	options := worker.DefaultResourceControllerOptions()
	options.MemTargetPercent = 0.8
	options.CpuTargetPercent = 0.9
	options.InfoSupplier = sysinfo.SysInfoProvider()
	controller := worker.NewResourceController(options)

	wfSS, err := worker.NewFixedSizeSlotSupplier(10)
	if err != nil {
		return worker.Options{}, err
	}

	actSS, err := worker.NewResourceBasedSlotSupplier(controller, worker.DefaultActivityResourceBasedSlotSupplierOptions())
	if err != nil {
		return worker.Options{}, err
	}

	laSS, err := worker.NewResourceBasedSlotSupplier(controller, worker.DefaultActivityResourceBasedSlotSupplierOptions())
	if err != nil {
		return worker.Options{}, err
	}

	nexusSS, err := worker.NewFixedSizeSlotSupplier(10)
	if err != nil {
		return worker.Options{}, err
	}

	compositeTuner, err := worker.NewCompositeTuner(worker.CompositeTunerOptions{
		WorkflowSlotSupplier:      wfSS,
		ActivitySlotSupplier:      actSS,
		LocalActivitySlotSupplier: laSS,
		NexusSlotSupplier:         nexusSS,
	})
	if err != nil {
		return worker.Options{}, err
	}
	return worker.Options{
		Tuner: compositeTuner,
	}, nil
}

// @@@SNIPEND
